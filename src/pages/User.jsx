import { lazy, useEffect, useState } from 'react'
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
import { STORE_NAME, STATE_NAME, REQUEST_STATUS } from '../utils/constant'

const ListTableView = lazy(() => import('../components/ListTableView'))

function User() {
  const dispatch = useDispatch()
  const {
    requestStatus,
    [STATE_NAME.USER_DETAIL]: detailState
  } = useSelector(state => state[STORE_NAME.USER])

  const [selectedData, setSelectedData] = useState(null)
  const [openDeleteUser, setOpenDeleteUser] = useState(false)
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [openCreateUpdateUser, setOpenCreateUpdateUser] = useState(false)
  const [title, setTitle] = useState('add new user')
  const [actionType, setActionType] = useState('create')

  const detailLoading = requestStatus === REQUEST_STATUS.USER_DETAIL_PENDING
  const createUserLoading = requestStatus === REQUEST_STATUS.USER_CREATE_PENDING
  const createUserSuccess = requestStatus === REQUEST_STATUS.USER_CREATE_SUCCESS
  const updateUserLoading = requestStatus === REQUEST_STATUS.USER_UPDATE_PENDING
  const updateUserSuccess = requestStatus === REQUEST_STATUS.USER_UPDATE_SUCCESS
  const deleteUserLoading = requestStatus === REQUEST_STATUS.USER_DELETE_PENDING
  const deleteUserSuccess = requestStatus === REQUEST_STATUS.USER_DELETE_SUCCESS
  const details = detailState
  const userID = !isEmpty(selectedData) && selectedData.id

  const handleOpenImagePreviewModal = () => setOpenImagePreview(true)
  const handleCloseImagePreviewModal = () => setOpenImagePreview(false)
  const handleOpenDeleteUser = () => setOpenDeleteUser(true)
  const handleCloseDeleteUser = () => setOpenDeleteUser(false)
  const handleGetDataSelected = (data) => setSelectedData(JSON.parse(data))
  const handleDeleteUser = () => dispatch(deleteUser(selectedData.id))
  
  const handleSetTitleAndActionType = (title, actionType) => {
    setTitle(title)
    setActionType(actionType)
  }
  
  const handleOpenCreateUpdateUser = () => setOpenCreateUpdateUser(true)
  const handleCloseCreateUpdateUser = () => {
    if (actionType === 'edit') handleSetTitleAndActionType('add new user', 'create')

    setOpenCreateUpdateUser(false)
  }

  const handleSubmit = (data) => dispatch(actionType === 'create' ? addUser(data) : updateUser(data))

  useEffect(() => {
    if (actionType === 'edit') dispatch(getUserDetail(userID))
  }, [dispatch, actionType])

  return (
    <main>
      <ListTableView
        addButtonLabel='create user'
        tableColumns={userTableColumns}
        responseKeyName='data'
        storeName={STORE_NAME.USER}
        listStateName={STATE_NAME.USER_LIST}
        listLoadingStatus={REQUEST_STATUS.USER_LIST_PENDING}
        onFetchList={getUserList}
        onFetchRefreshList={getRefreshUserList}

        openImagePreviewModal={openImagePreview}
        handleOpenImagePreviewModal={handleOpenImagePreviewModal}
        handleCloseImagePreviewModal={handleCloseImagePreviewModal}
        
        source='User'
        selectedData={!isEmpty(selectedData) && selectedData}
        openDeleteModal={openDeleteUser}
        handleGetDataSelected={handleGetDataSelected}
        handleOpenDeleteModal={handleOpenDeleteUser}
        handleCloseDeleteModal={handleCloseDeleteUser}
        handleDeleteData={handleDeleteUser}

        openCreateUpdateModal={openCreateUpdateUser}
        title={title}
        actionType={actionType}
        details={details}
        detailLoading={detailLoading}
        createDataLoading={createUserLoading}
        createDataSuccess={createUserSuccess}
        updateDataLoading={updateUserLoading}
        updateDataSuccess={updateUserSuccess}
        deleteDataLoading={deleteUserLoading}
        deleteDataSuccess={deleteUserSuccess}
        inputs={generateInputCreateUpdateUser(actionType, details)}
        handleOpenCreateUpdateModal={handleOpenCreateUpdateUser}
        handleSetTitleAndActionType={handleSetTitleAndActionType}
        handleCloseCreateUpdateModal={handleCloseCreateUpdateUser}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default User