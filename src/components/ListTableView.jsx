import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid } from '@mui/material'

import { isEmpty } from 'lodash'

import Table from '../components/Table/Table'

function ListTableView({
  TableRowCustom,
  showSearchFilter = false,
  addButtonLabel = 'Create Post',
  tableColumns,
  responseKeyName,
  storeName,
  listStateName,
  listStatusLoading,
  basePath,
  onFetchList,
  onFetchSearch
}) {
  const [page, setPage] = useState(0)
  const [fetchType, setFetchType] = useState({ name: 'initial' })
  const [searchValue, setSearchValue] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)

  const [filter, setFilter] = useState({ filterKey: 'NONE' })

  const dispatch = useDispatch()
  const { 
    requestStatus,
    [listStateName]: listState
  } = useSelector((state) => state[storeName])

  const listIsLoading = requestStatus === listStatusLoading

  const { [responseKeyName]: list = [], total } = listState

  const rowsPerPage = 10

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
        setPage(0)

        handleFetchDataType('search')
      }, 500)
    )
  }

  const handleNextPage = () => {
    handleFetchDataType('next-page')
  }

  const handlePageChange = (event, newPage) => {
    event.preventDefault()

    const totalData = total
    const numberOfList = list.length
    const numberOfRow = rowsPerPage * (newPage+1)

    if (numberOfRow === numberOfList && numberOfRow !== totalData) handleNextPage()
    
    setPage(newPage)
  }

  const FILTERS = {
    NONE: (listWithPagination) => listWithPagination,
    ALLSELECTED: (listWithoutPagination) => listWithoutPagination.filter(({ brand, category, price }) => 
      categoriesAndBrandsSelected.includes(category) &&
      categoriesAndBrandsSelected.includes(brand) &&
      price >= minPriceSelected && price <= maxPriceSelected
    ),
    SOMESELECTED: (listWithoutPagination) => listWithoutPagination.filter(({ brand, category, price }) => 
      categoriesAndBrandsSelected.includes(brand)
        ? categoriesAndBrandsSelected.includes(category) ||
          categoriesAndBrandsSelected.includes(brand) &&
          price >= minPriceSelected && price <= maxPriceSelected
        : !isEmpty(categoriesAndBrandsSelected)
          ? categoriesAndBrandsSelected.includes(brand) ||
            categoriesAndBrandsSelected.includes(category) &&
            price >= minPriceSelected && price <= maxPriceSelected
          : price >= minPriceSelected && price <= maxPriceSelected
    )
  }

  const handleFetchList = useCallback(() => {
    let param = {
      limit: 30
    }

    if (fetchType.name === 'next-page') {
      param = {
        ...param,
        skip: list.length
      }
    }

    if (fetchType.name === 'all-data') dispatch(onFetchList({ limit: 0 }))
    if (fetchType.name === 'search') dispatch(onFetchSearch({ 
      q: searchValue,
      limit: 0
    }))
    
    if (fetchType.name === 'initial' || fetchType.name === 'next-page') dispatch(onFetchList({ ...param }))
  }, [fetchType])

  useEffect(() => {
    handleFetchList()
  }, [handleFetchList])

  const filterFunction = FILTERS[filter.filterKey]
  const filteredList = filterFunction(list)

  return (
    <Grid spacing={2} container>
      <Grid item xs={12} justifyContent='center' container>
        <Button variant='contained'>
          {addButtonLabel}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Table
          TableRowCustom={TableRowCustom}
          columns={tableColumns}
          rows={filteredList}
          page={page}
          rowsPerPage={rowsPerPage}
          basePath={basePath}
          listIsLoading={listIsLoading}
          onPageChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}

export default ListTableView