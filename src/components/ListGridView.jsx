import { lazy, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Button, Grid, Pagination, PaginationItem, Stack, styled, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { getReadableDate } from '../utils/helpers/format-helper'
import { limitExcededStr } from '../utils/helpers/string-helper'
import Search from '../components/Search/Search'
import { useStorageState } from '../hooks/useStorageState'

const GridItem = lazy(() => import('../components/GridItem'))

const StyledPagination = styled(Pagination)(() => ({
  '& ul': {
    display: 'flex',
    flexWrap: 'nowrap',
  }
}))

const PrevIcon = () => {
  return (
    <Button startIcon={<ArrowBackIosIcon />}>prev</Button>
  )
}

const NextIcon = () => {
  return (
    <Button endIcon={<ArrowForwardIosIcon />}>next</Button>
  )
}

const useNavigateParams = () => {
  const navigate = useNavigate()

  return (pathname, params) => {
    navigate(`${pathname}?${createSearchParams(params)}`)
  }
}

function ListGridView({
  responseKeyName,
  storeName,
  listStateName,
  listLoadingStatus,
  onFetchList,
  onFetchSearch
}) {
  const dispatch = useDispatch()
  const { 
    requestStatus,
    [listStateName]: listState
  } = useSelector((state) => state[storeName])

  const listLoading = requestStatus === listLoadingStatus
  const { [responseKeyName]: list = [], total } = listState
  const pageAmount = Math.floor(total / 20)

  const navigate = useNavigate()
  const navigateWithParams = useNavigateParams()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const [fetchType, setFetchType] = useState({ name: 'initial' })
  const [page, setPage] = useState(parseInt(query.get('page') || '1'))
  const [searchValue, setSearchValue] = useStorageState('search', '')
  const [searchTimeout, setSearchTimeout] = useState(null)
 
  const handleFetchDataType = (type) => {
    setFetchType({
      ...fetchType,
      name: type
    })
  }

  const handleSearchChange = (event, emptyValue) => {
    const { value } = event.target
    clearTimeout(searchTimeout)
    
    setSearchValue(
      typeof emptyValue === 'string'
        ? emptyValue
        : value
    )
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        setPage(1)
        navigate('/')
        !isEmpty(value) ? handleFetchDataType('search') : handleFetchDataType('initial')
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

    if (fetchType.name === 'search') dispatch(onFetchSearch(searchValue))

    if ((fetchType.name === 'page-change' && page > 0)) {
      dispatch(isEmpty(searchValue)
        ? onFetchList({ ...param, page: page })
        : onFetchSearch({
            ...param,
            inputValue: searchValue,
            page: page
          })
      )
    }

    if ((fetchType.name === 'initial')) {
      dispatch(isEmpty(searchValue)
        ? onFetchList({
            ...param,
            page: page == 1 ? 1 : page
          })
        : onFetchSearch({
            ...param,
            inputValue: searchValue,
            page: page == 1 ? 0 : page
          })
      )
    }
  }, [fetchType, page])

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
    
    handleFetchList()
  }, [handleFetchList])

  return (
    <>
      <Grid spacing={1} container>
        <Grid item xs={12}>
          <Search
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
          />
        </Grid>
        <Grid minHeight='80vh' item xs={12} spacing={2} container>
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
            const submittedData = {
              id,
              owner: owner.id,
              text,
              likes,
              image,
              tags
            }

            return (
              <Grid item xs={6} md={3} key={id}>
                <GridItem
                  listLoading={listLoading}
                  id={id}
                  avatar={picture}
                  title={fullName}
                  subHeader={date}
                  image={image}
                  contentText={contentText}
                  tags={tags}
                  likes={likes}
                  submittedData={submittedData}
                />
              </Grid>
            )
          })}
  
          {!isEmpty(searchValue) && isEmpty(list) && 
            <Grid mt={20} justifyContent='center' container>
              <Typography>No matches for "{searchValue}"</Typography>
            </Grid>
          }
        </Grid>
        <Grid item xs={12} justifyContent='center' container>
          <Stack overflow='auto' margin='10px 0'>
            <StyledPagination
              page={page}
              count={pageAmount || 0}
              color='primary'
              size='large'
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem {...item}
                  slots={{ previous: PrevIcon, next: NextIcon }}
                />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default ListGridView