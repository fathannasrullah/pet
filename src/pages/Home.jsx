import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, Pagination, PaginationItem, Stack, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

import { STATE_NAME, STORE_NAME } from '../utils/constant'

import { getHomeList } from '../store/post/action'

import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'

const useNavigateParams = () => {
  const navigate = useNavigate()

  return (pathname, params) => {
    navigate(`${pathname}?${createSearchParams(params)}`)
  }
}

function Home() {
  const dispatch = useDispatch()
  const { 
    requestStatus,
    [STATE_NAME.HOME_LIST]: listState
  } = useSelector((state) => state[STORE_NAME.POST])

  const { data: list = [], total } = listState
  const pageAmount = Math.floor(total / 20)

  const navigate = useNavigateParams()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const [page, setPage] = useState(parseInt(query.get('page') || '1'))
  const [fetchType, setFetchType] = useState('initial')
  
  const handleFetchDataType = (type) => {
    setFetchType(type)
  }

  const handlePageChange = (event, value) => {
    event.preventDefault()
    setPage(value)
    handleFetchDataType('page-change')

    navigate('/home', { page: value })
  }

  const handleFetchList = useCallback(() => {
    let param = {
      page: 1,
      limit: 20
    }

    if ((fetchType === 'page-change' && page > 0) || (fetchType === 'initial' && page > 0)) {
      dispatch(getHomeList({
        ...param,
        page: page
      }))
    }

    if (fetchType === 'initial' && page == 1) dispatch(getHomeList({ ...param }))
  }, [fetchType, page])

  useEffect(() => {
    handleFetchList()
  }, [handleFetchList])

  console.log('fetch type:' + fetchType)
  console.log('liistState :' + listState)
  console.log('query' + query)

  return (
    <main>
      <Grid spacing={1} container>
        <Grid item xs={12}>
          <p>search component</p>
        </Grid>
        <Grid item xs={12} spacing={2} container>
          {list.map(({
            id,
            owner,
            text,
            image,
            publishDate,
            tags
          }) => {
            const { firstName, lastName } = owner
            const fullName = firstName + lastName

            return (
              <Grid item xs={6} md={3} key={id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        R
                      </Avatar>
                    }
                    title={fullName}
                    subheader={publishDate}
                  />
                  <CardMedia
                    component='img'
                    height='194'
                    image={image}
                    alt={fullName}
                  />
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      {text}
                    </Typography>
                    <Grid container spacing={0.5}>
                      {tags.map((tag, index) => (
                        <Grid key={index} item>
                          <Chip label={tag} size='small' />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label='add to favorites'>
                      <FavoriteIcon />
                      </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          }
        )}
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <Pagination
              page={page}
              count={pageAmount}
              onChange={handlePageChange}
              color='primary'
              size='large'
            />
          </Stack>
        </Grid>
      </Grid>
    </main>
  )
}

export default Home