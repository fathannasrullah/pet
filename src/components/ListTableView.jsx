import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid } from '@mui/material'
import Table from '../components/Table/Table'
import DeleteDataModal from './DeleteDataModal'
import CreateUpdateModal from './CreateUpdateModal/CreateUpdateModal'
import ImagePreviewModal from './ImagePreviewModal'

function ListTableView({
  TableRowCustom,
  addButtonLabel = 'Create Post',
  tableColumns,
  responseKeyName,
  storeName,
  listStateName,
  listLoadingStatus,
  basePath,
  onFetchList,
  onFetchRefreshList,

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
  deleteDataLoading,
  deleteDataSuccess,
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
  const [filter, setFilter] = useState({ filterKey: 'NONE' })

  const dispatch = useDispatch()
  const { 
    requestStatus,
    [listStateName]: listState
  } = useSelector((state) => state[storeName])

  const listIsLoading = requestStatus === listLoadingStatus

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

  const handlePageChange = (event, newPage) => {
    event.preventDefault()

    const totalData = total
    const listAmount = list.length
    let rowAmount = 10
    
    if (newPage >= 1) rowAmount = newPage == 1 ? rowsPerPage * 1 : rowsPerPage * newPage
    if ((rowAmount === listAmount) && (rowAmount !== totalData)) handleFetchDataType('next-page')
    
    setPage(newPage)
  }

  const handleFetchList = useCallback(() => {
    let param = {
      limit: 10,
      page: 1
    }

    if (fetchType.name === 'next-page') {
      dispatch(onFetchList({
        ...param,
        page: currPage + 1
      }))
    }
    if (fetchType.name === 'refresh-page') dispatch(onFetchRefreshList({ ...param }))
    if (fetchType.name === 'initial') dispatch(onFetchList({ ...param }))
  }, [fetchType])

  useEffect(() => {
    handleFetchList()
  }, [handleFetchList])

  const FILTERS = {
    NONE: (listWithPagination) => listWithPagination,
  }
  
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
            totalList={total}
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
          deleteDataSuccess={deleteDataSuccess}
          handleClose={handleCloseDeleteModal}
          setPage={setPage}
          handleDeleteData={handleDeleteData}
          handleFetchDataType={handleFetchDataType}
        />
      }
      
      {openCreateUpdateModal &&
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
          setPage={setPage}
          handleFetchDataType={handleFetchDataType}
          handleOpenCreateUpdateModal={handleOpenCreateUpdateModal}
          handleCloseCreateUpdateModal={handleCloseCreateUpdateModal}
          onSubmit={handleSubmit}
        />
      }
    </>
  )
}

export default ListTableView