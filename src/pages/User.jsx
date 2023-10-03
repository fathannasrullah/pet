import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { isEmpty } from 'lodash'

import {
  getUserList,
  getRefreshUserList,
  deleteUser,
  addUser,
  updateUser
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

  const [selectedData, setSelectedData] = useState(null)
  const [openDeletePost, setOpenDeletePost] = useState(false)
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [openCreateUpdatePost, setOpenCreateUpdatePost] = useState(false)
  const [title, setTitle] = useState('add new user')
  const [actionType, setActionType] = useState('create')

  const handleOpenImagePreviewModal = () => setOpenImagePreview(true)
  const handleCloseImagePreviewModal = () => setOpenImagePreview(false)
  const handleOpenDeletePost = () => setOpenDeletePost(true)
  const handleCloseDeletePost = () => setOpenDeletePost(false)
  const handleGetDataSelected = (data) => setSelectedData(JSON.parse(data))
  const handleDeletePost = () => dispatch(deleteUser(selectedData.id))
  const handleCloseCreateUpdatePost = () => setOpenCreateUpdatePost(false)

  const handleSetTitleAndActionType = (title, actionType) => {
    setTitle(title)
    setActionType(actionType)
  }
  
  const handleOpenCreateUpdatePost = () => {
    if (actionType === 'edit') handleSetTitleAndActionType('add new user', 'add')
    setOpenCreateUpdatePost(true)
  }

  const handleSubmit = (input) => {
    console.log('login submitted: ', input)
    dispatch(
      actionType === 'create' ? addUser(input) : updateUser(input)
    )
  }
  
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
        inputs={generateInputCreateUpdateUser(actionType, selectedData)}
        handleOpenCreateUpdateModal={handleOpenCreateUpdatePost}
        handleSetTitleAndActionType={handleSetTitleAndActionType}
        handleCloseCreateUpdateModal={handleCloseCreateUpdatePost}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default User