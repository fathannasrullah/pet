import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { isEmpty } from 'lodash'

import {
  getUserList,
  getRefreshUserList,
  deleteUser
} from '../store/user/action'

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

  const handleOpenDeletePost = () => setOpenDeletePost(true)

  const handleCloseDeletePost = () => setOpenDeletePost(false)

  const handleGetDataSelected = (data) => setSelectedData(JSON.parse(data))

  const handleDeletePost = () => dispatch(deleteUser(selectedData.id))
  
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

        source='User'
        selectedData={!isEmpty(selectedData) && selectedData.firstName}
        openDeleteModal={openDeletePost}
        handleGetDataSelected={handleGetDataSelected}
        handleOpenDeleteModal={handleOpenDeletePost}
        handleCloseDeleteModal={handleCloseDeletePost}
        handleDeleteData={handleDeletePost}
      />
    </main>
  )
}

export default User