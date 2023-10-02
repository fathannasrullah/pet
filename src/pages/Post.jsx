import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { isEmpty } from 'lodash'

import { deletePost, getPostList, getRefreshPostList } from '../store/post/action'

import { postTableColumns } from '../utils/table-colums/post-table-columns'
import { 
  STORE_NAME,
  STATE_NAME,
  REQUEST_STATUS
} from '../utils/constant'

import ListTableView from '../components/ListTableView'

function Post() {
  const dispatch = useDispatch()

  const [selectedData, setSelectedData] = useState(null)
  const [openDeletePost, setOpenDeletePost] = useState(false)

  const handleOpenDeletePost = () => setOpenDeletePost(true)

  const handleCloseDeletePost = () => setOpenDeletePost(false)

  const handleGetDataSelected = (data) => setSelectedData(JSON.parse(data))

  const handleDeletePost = () => dispatch(deletePost(selectedData.id))
  
  return (
    <main>
      <ListTableView
        tableColumns={postTableColumns}
        responseKeyName='data'
        storeName={STORE_NAME.POST}
        listStateName={STATE_NAME.POST_LIST}
        listLoadingStatus={REQUEST_STATUS.POST_LIST_PENDING}
        deleteLoadingStatus={REQUEST_STATUS.POST_DELETE_PENDING}
        deleteSuccessStatus={REQUEST_STATUS.POST_DELETE_SUCCESS}
        onFetchList={getPostList}
        onFetchRefreshList={getRefreshPostList}

        selectedData={!isEmpty(selectedData) && selectedData.owner.firstName}
        openDeleteModal={openDeletePost}
        handleGetDataSelected={handleGetDataSelected}
        handleOpenDeleteModal={handleOpenDeletePost}
        handleCloseDeleteModal={handleCloseDeletePost}
        handleDeleteData={handleDeletePost}
      />
    </main>
  )
}

export default Post