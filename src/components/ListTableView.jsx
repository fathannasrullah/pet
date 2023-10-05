import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid } from '@mui/material'

import { isEmpty } from 'lodash'

import Table from '../components/Table/Table'
import DeleteDataModal from './DeleteDataModal'
import CreateUpdateModal from './CreateUpdateModal/CreateUpdateModal'
import ImagePreviewModal from './ImagePreviewModal'

function ListTableView({
  TableRowCustom,
  //showSearchFilter = false,
  addButtonLabel = 'Create Post',
  tableColumns,
  responseKeyName,
  storeName,
  listStateName,
  listLoadingStatus,
  deleteLoadingStatus,
  deleteSuccessStatus,
  basePath,
  onFetchList,
  onFetchRefreshList,
  onFetchSearch,

  openImagePreviewModal,
  handleOpenImagePreviewModal,
  handleCloseImagePreviewModal,

  source,
  openDeleteModal,
  selectedData,
  handleGetDataSelected,
  handleOpenDeleteModal,
  handleCloseDeleteModal,
  handleDeleteData,

  openCreateUpdateModal,
  title,
  actionType,
  inputs,
  btnText,
  details,
  detailLoading,
  createDataLoading,
  createDataSuccess,
  updateDataLoading,
  updateDataSuccess,
  storeNameForAutocomplate,
  stateNameForAutocomplete,
  getAutocompleteList,
  handleSetTitleAndActionType,
  handleOpenCreateUpdateModal,
  handleCloseCreateUpdateModal,
  handleSubmit
}) {
  const [page, setPage] = useState(0)
  const [fetchType, setFetchType] = useState({ name: 'initial' })
  const [searchValue, setSearchValue] = useState('')
  const [filter, setFilter] = useState({ filterKey: 'NONE' })

  const dispatch = useDispatch()
  const { 
    requestStatus,
    [listStateName]: listState
  } = useSelector((state) => state[storeName])

  const listIsLoading = requestStatus === listLoadingStatus
  const deleteDataLoading = requestStatus === deleteLoadingStatus
  const deleteDataSuccess = requestStatus === deleteSuccessStatus

  const {
    [responseKeyName]: list = [],
    page: currPage,
    total
  } = listState

  const rowsPerPage = 10

  const handleFetchDataType = (type) => {
    setFetchType({
      ...fetchType,
      name: type
    })
  }

  const handleNextPage = () => {
    handleFetchDataType('next-page')
  }

  const handlePageChange = (event, newPage) => {
    event.preventDefault()
    
    const totalData = total
    const listAmount = list.length
    const rowAmount = rowsPerPage * (newPage+1)

    if (rowAmount === listAmount && rowAmount !== totalData) handleNextPage()
    
    setPage(newPage)
  }

  const FILTERS = {
    NONE: (listWithPagination) => listWithPagination,
    /*ALLSELECTED: (listWithoutPagination) => listWithoutPagination.filter(({ brand, category, price }) => 
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
    )*/
  }

  const handleFetchList = useCallback(() => {
    let param = {
      limit: 30,
      page: 1
    }

    if (fetchType.name === 'next-page') {
      param = {
        ...param,
        page: currPage + 1
      }
    }

    if (fetchType.name === 'all-data') dispatch(onFetchList({ limit: 0 }))
    if (fetchType.name === 'search') dispatch(onFetchSearch({ 
      q: searchValue,
      limit: 0
    }))
    
    if (fetchType.name === 'initial' || fetchType.name === 'next-page') dispatch(onFetchList({ ...param }))

    if (deleteDataSuccess) {
      setPage(0)
      handleCloseDeleteModal()
      dispatch(onFetchRefreshList({ ...param, page: 1 }))
    }
  }, [fetchType, deleteDataSuccess])

  useEffect(() => {
    handleFetchList()
  }, [handleFetchList])

  const filterFunction = FILTERS[filter.filterKey]
  const filteredList = filterFunction(list)

  return (
    <>
      <Grid spacing={2} container>
        <Grid item xs={12} justifyContent='center' container>
          <Button
            variant='contained'
            onClick={handleOpenCreateUpdateModal}
          >
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
            
            handleGetDataSelected={handleGetDataSelected}
            handleOpenImagePreviewModal={handleOpenImagePreviewModal}
            handleOpenDeleteModal={handleOpenDeleteModal}
            handleOpenCreateUpdateModal={handleOpenCreateUpdateModal}
            handleSetTitleAndActionType={handleSetTitleAndActionType}
          />
        </Grid>
      </Grid>

      {openImagePreviewModal &&
        <ImagePreviewModal
          open={openImagePreviewModal}
          image={selectedData.image || selectedData.picture}
          handleClose={handleCloseImagePreviewModal}
        />
      }

      {openDeleteModal &&
        <DeleteDataModal
          source={source}
          open={openDeleteModal}
          selectedData={selectedData.firstName || selectedData.owner.firstName}
          deleteDataLoading={deleteDataLoading}
          handleClose={handleCloseDeleteModal}
          handleDeleteData={handleDeleteData}
        />
      }
      
      {
      //((actionType === 'edit' && !isEmpty(details) && openCreateUpdateModal) || (actionType === 'create' && openCreateUpdateModal)) 
      openCreateUpdateModal &&
        <CreateUpdateModal
          title={title}
          actionType={actionType}
          open={openCreateUpdateModal}
          detailLoading={detailLoading}
          createDataLoading={createDataLoading}
          createDataSuccess={createDataSuccess}
          updateDataLoading={updateDataLoading}
          updateDataSuccess={updateDataSuccess}
          inputs={inputs}
          details={details}
          btnText={btnText}
          storeNameForAutocomplete={storeNameForAutocomplate}
          stateNameForAutocomplete={stateNameForAutocomplete}
          getAutocompleteList={getAutocompleteList}
          handleOpenCreateUpdateModal={handleOpenCreateUpdateModal}
          handleCloseCreateUpdateModal={handleCloseCreateUpdateModal}
          onSubmit={handleSubmit}
        />
      }
    </>
  )
}

export default ListTableView