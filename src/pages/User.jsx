import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isEmpty } from 'lodash'

import {
  getUserList,
  getRefreshUserList,
  deleteUser,
  addUser,
  updateUser,
  getUserDetail
} from '../store/user/action'
import { generateInputCreateUpdateUser } from '../utils/inputs/generateInputCreateUpdateUser'
import { userTableColumns } from '../utils/table-colums/user-table-columns'
import { 
  STORE_NAME,
  STATE_NAME,
  REQUEST_STATUS
} from '../utils/constant'

import ListTableView from '../components/ListTableView'

function User() {
  const dispatch = useDispatch()
  const {
    requestStatus,
    [STATE_NAME.USER_DETAIL]: detailState
  } = useSelector(state => state[STORE_NAME.USER])

  const [selectedData, setSelectedData] = useState(null)
  const [openDeletePost, setOpenDeletePost] = useState(false)
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [openCreateUpdatePost, setOpenCreateUpdatePost] = useState(false)
  const [title, setTitle] = useState('add new user')
  const [actionType, setActionType] = useState('create')

  const detailLoading = requestStatus === REQUEST_STATUS.USER_DETAIL_PENDING
  const createUserLoading = requestStatus === REQUEST_STATUS.USER_CREATE_PENDING
  const createUserSuccess = requestStatus === REQUEST_STATUS.USER_CREATE_SUCCESS
  const updateUserLoading = requestStatus === REQUEST_STATUS.USER_UPDATE_PENDING
  const updateUserSuccess = requestStatus === REQUEST_STATUS.USER_UPDATE_SUCCESS
  const details = detailState
  const userID = !isEmpty(selectedData) && selectedData.id
  
  const handleOpenImagePreviewModal = () => setOpenImagePreview(true)
  const handleCloseImagePreviewModal = () => setOpenImagePreview(false)
  const handleOpenDeletePost = () => setOpenDeletePost(true)
  const handleCloseDeletePost = () => setOpenDeletePost(false)
  const handleGetDataSelected = (data) => setSelectedData(JSON.parse(data))
  const handleDeletePost = () => dispatch(deleteUser(selectedData.id))
  
  const handleSetTitleAndActionType = (title, actionType) => {
    setTitle(title)
    setActionType(actionType)
  }
  
  const handleOpenCreateUpdatePost = () => {
    setOpenCreateUpdatePost(true)
  }

  const handleCloseCreateUpdatePost = () => {
    if (actionType === 'edit') handleSetTitleAndActionType('add new user', 'create')
    setOpenCreateUpdatePost(false)
    if (createUserSuccess || updateUserSuccess) dispatch(getUserList())
  }
  
  const handleSubmit = (data) => {
    console.log('data submitted: ', data)
    dispatch(
      actionType === 'create' ? addUser(data) : updateUser(data)
    )
  }
  
  useEffect(() => {
    !isEmpty(userID) && dispatch(getUserDetail(userID))
  }, [userID, dispatch])

  console.log('create status :', requestStatus)
  return (
    <main>
      <ListTableView
        addButtonLabel='create user'
        tableColumns={userTableColumns}
        responseKeyName='data'
        storeName={STORE_NAME.USER}
        listStateName={STATE_NAME.USER_LIST}
        listLoadingStatus={REQUEST_STATUS.USER_LIST_PENDING}
        deleteLoadingStatus={REQUEST_STATUS.USER_DELETE_PENDING}
        deleteSuccessStatus={REQUEST_STATUS.USER_DELETE_SUCCESS}
        onFetchList={getUserList}
        onFetchRefreshList={getRefreshUserList}

        openImagePreviewModal={openImagePreview}
        handleOpenImagePreviewModal={handleOpenImagePreviewModal}
        handleCloseImagePreviewModal={handleCloseImagePreviewModal}
        
        source='User'
        selectedData={!isEmpty(selectedData) && selectedData}
        openDeleteModal={openDeletePost}
        handleGetDataSelected={handleGetDataSelected}
        handleOpenDeleteModal={handleOpenDeletePost}
        handleCloseDeleteModal={handleCloseDeletePost}
        handleDeleteData={handleDeletePost}

        openCreateUpdateModal={openCreateUpdatePost}
        title={title}
        actionType={actionType}
        details={details}
        detailLoading={detailLoading}
        createDataLoading={createUserLoading}
        createDataSuccess={createUserSuccess}
        updateDataLoading={updateUserLoading}
        updateDataSuccess={updateUserSuccess}
        inputs={generateInputCreateUpdateUser(actionType, details)}
        handleOpenCreateUpdateModal={handleOpenCreateUpdatePost}
        handleSetTitleAndActionType={handleSetTitleAndActionType}
        handleCloseCreateUpdateModal={handleCloseCreateUpdatePost}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default User