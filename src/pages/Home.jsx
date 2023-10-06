import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, Pagination, Skeleton, Stack, ThemeProvider, Typography, styled } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { REQUEST_STATUS, STATE_NAME, STORE_NAME } from '../utils/constant'

import { getHomeList, getSearchPostByTag } from '../store/post/action'

import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import Search from '../components/Search/Search'
import { isEmpty } from 'lodash'
import { currencyFormat, getReadableDate } from '../utils/helpers/format-helper'
import { limitExcededStr } from '../utils/helpers/string-helper'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  '& p': {
    fontSize: '16px',
    color: theme.palette.common.purple.light[1]
  },
  '& span': {
    fontSize: '11px',
    color: theme.palette.common.purple.light[3]
  }
}))

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

  const listLoading = requestStatus === REQUEST_STATUS.POST_LIST_PENDING
  const { data: list = [], total } = listState
  const pageAmount = Math.floor(total / 20)

  const navigate = useNavigate()
  const navigateWithParams = useNavigateParams()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const [fetchType, setFetchType] = useState({ name: 'initial' })
  const [page, setPage] = useState(parseInt(query.get('page') || '1'))
  const [searchValue, setSearchValue] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
 
  const handleFetchDataType = (type) => {
    setFetchType({
      ...fetchType,
      name: type
    })
  }

  const handleSearchChange = (event, emptyValue) => {
    clearTimeout(searchTimeout)
    
    setSearchValue(
      typeof emptyValue === 'string'
        ? emptyValue
        : event.target.value
    )

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        setPage(1)
        navigate('/')

        handleFetchDataType('search')
      }, 500)
    )
  }

  const handlePageChange = (event, value) => {
    event.preventDefault()
    setPage(value)
    handleFetchDataType('page-change')

    navigateWithParams('/home', { page: value })
  }

  const handleFetchList = useCallback(() => {
    let param = {
      page: 1,
      limit: 20
    }

    if (fetchType.name === 'search' && !isEmpty(searchValue)) dispatch(getSearchPostByTag(searchValue))

    if ((fetchType.name === 'page-change' && page > 0) ||
      (fetchType.name === 'initial' && page > 0) ||
      (fetchType.name === 'search' && !isEmpty(list))
      ) {
        dispatch(isEmpty(searchValue)
          ? getHomeList({
              ...param,
              page: page
            })
          : getSearchPostByTag({
            ...param,
            inputValue: searchValue,
            page: page
          })
        )
    }

    if ((fetchType.name === 'initial' && page == 1) || (fetchType.name === 'search' && isEmpty(searchValue)) ) dispatch(getHomeList({ ...param }))
  }, [fetchType, page, searchValue])

  useEffect(() => {
    handleFetchList()
  }, [handleFetchList])

  return (
    <main>
      <Grid spacing={1} container>
        <Grid item xs={12}>
          <Search
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
          />
        </Grid>
        <Grid minHeight='80vh' item xs={12} spacing={2} container>
          {isEmpty(list) && <Grid mt={20} justifyContent='center' container><Typography>NO DATA</Typography></Grid>}
          {list.map(({
            id,
            owner,
            text,
            image,
            publishDate,
            tags,
            likes
          }) => {
            const { firstName, lastName, picture } = owner
            const fullName = limitExcededStr(`${firstName} ${lastName}`, 8)
            const date = getReadableDate(publishDate, 'en')
            const contentText = limitExcededStr(text, 33)
            const likeAmount = currencyFormat(likes, 0)

            return (
              <Grid item xs={6} md={3} key={id}>
                <Card sx={{ minHeight: 400, maxWidth: 345, overflow: 'auto' }}>
                  <StyledCardHeader
                    avatar={<Avatar aria-label="recipe" src={picture || <AccountCircleIcon />} />}
                    title={listLoading ? (
                      <Skeleton sx={{ marginBottom: '5px' }} variant='rectangular' /> 
                    ) : (
                      <p>{fullName}</p> 
                    )}
                    subheader={listLoading ? (
                      <Skeleton variant='rectangular' /> 
                    ) : (
                      <span>{date}</span> 
                    )}
                  />
                  {listLoading ? (
                    <Skeleton sx={{ minHeight: '200px' }} variant='rectangular' />
                  ) : (
                    <CardMedia
                      component='img'
                      height='194'
                      image={image || 'https://i.ibb.co/V2nrLXx/no-image.jpg'}
                      alt={fullName}
                    />
                  )}
                  <CardContent>
                    {listLoading ? (<Skeleton variant='rectangular'/>) : (<Typography>{contentText}</Typography>)}
                  </CardContent>
                  {listLoading ? (
                    <Skeleton variant='rectangular' />
                  ) : (
                    <Stack direction='row' spacing={0.5} padding='0 10px'>
                      {tags.map((tag, index) => (
                        <Chip key={index} label={tag} size='small' />
                      ))}
                    </Stack>
                  )}
                  {listLoading ? (
                    <Skeleton sx={{ marginTop: '5px' }} variant='rectangular' />
                  ) : (
                    <CardActions disableSpacing>
                      <IconButton aria-label='likes'>
                        <FavoriteIcon/>
                      </IconButton>
                      <span>{likeAmount}</span>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            )
          }
        )}
        </Grid>
        <Grid item xs={12} justifyContent='center' container>
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