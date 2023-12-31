import { lazy, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import { addPost, deletePost, getPostList, getRefreshPostList, updatePost } from '../store/post/action'
import { getUserList } from '../store/user/action'
import { postTableColumns } from '../utils/table-colums/post-table-columns'
import { STORE_NAME, STATE_NAME, REQUEST_STATUS } from '../utils/constant'
import { generateInputCreateUpdatePost } from '../utils/inputs/generateInputCreateUpdatePost'

const ListTableView = lazy(() => import('../components/ListTableView'))

function Post() {
  const dispatch = useDispatch()
  const { requestStatus } = useSelector(state => state[STORE_NAME.POST])
  const { requestStatus: requestStatusSecondary } = useSelector((state) => state[STORE_NAME.USER])

  const [selectedData, setSelectedData] = useState(null)
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [openDeletePost, setOpenDeletePost] = useState(false)
  const [openCreateUpdatePost, setOpenCreateUpdatePost] = useState(false)
  const [title, setTitle] = useState('add new post')
  const [actionType, setActionType] = useState('create')

  const autocompleteListLoading = requestStatusSecondary === REQUEST_STATUS.USER_LIST_PENDING
  const createPostLoading = requestStatus === REQUEST_STATUS.POST_CREATE_PENDING
  const createPostSuccess = requestStatus === REQUEST_STATUS.POST_CREATE_SUCCESS
  const updatePostLoading = requestStatus === REQUEST_STATUS.POST_UPDATE_PENDING
  const updatePostSuccess = requestStatus === REQUEST_STATUS.POST_UPDATE_SUCCESS
  const deletePostLoading = requestStatus === REQUEST_STATUS.POST_DELETE_PENDING
  const deletePostSuccess = requestStatus === REQUEST_STATUS.POST_DELETE_SUCCESS

  const handleOpenImagePreviewModal = () => setOpenImagePreview(true)
  const handleCloseImagePreviewModal = () => setOpenImagePreview(false)
  const handleOpenDeletePost = () => setOpenDeletePost(true)
  const handleCloseDeletePost = () => setOpenDeletePost(false)
  const handleGetDataSelected = (data) => setSelectedData(JSON.parse(data))
  const handleDeletePost = () => dispatch(deletePost(selectedData.id))
  
  const handleSetTitleAndActionType = (title, actionType) => {
    setTitle(title)
    setActionType(actionType)
  }
  
  const handleOpenCreateUpdatePost = () => setOpenCreateUpdatePost(true)
  const handleCloseCreateUpdatePost = () => {
    if (actionType === 'edit') handleSetTitleAndActionType('add new post', 'create')

    setOpenCreateUpdatePost(false)
  }

  const handleSubmit = (data) => {
    const submittedData = {
      ...data,
      owner: data.owner.id
    }
    
    dispatch(actionType === 'create' ? addPost(submittedData) : updatePost(submittedData))
  }

  return (
    <main>
      <ListTableView
        tableColumns={postTableColumns}
        responseKeyName='data'
        storeName={STORE_NAME.POST}
        listStateName={STATE_NAME.POST_LIST}
        listLoadingStatus={REQUEST_STATUS.POST_LIST_PENDING}
        onFetchList={getPostList}
        onFetchRefreshList={getRefreshPostList}

        openImagePreviewModal={openImagePreview}
        handleOpenImagePreviewModal={handleOpenImagePreviewModal}
        handleCloseImagePreviewModal={handleCloseImagePreviewModal}
        
        selectedData={!isEmpty(selectedData) && selectedData}
        openDeleteModal={openDeletePost}
        handleGetDataSelected={handleGetDataSelected}
        handleOpenDeleteModal={handleOpenDeletePost}
        handleCloseDeleteModal={handleCloseDeletePost}
        handleDeleteData={handleDeletePost}

        openCreateUpdateModal={openCreateUpdatePost}
        title={title}
        actionType={actionType}
        details={selectedData}
        autocompleteListLoading={autocompleteListLoading}
        createDataLoading={createPostLoading}
        createDataSuccess={createPostSuccess}
        updateDataLoading={updatePostLoading}
        updateDataSuccess={updatePostSuccess}
        deleteDataLoading={deletePostLoading}
        deleteDataSuccess={deletePostSuccess}
        inputs={generateInputCreateUpdatePost(actionType, selectedData)}
        storeNameForAutocomplate={STORE_NAME.USER}
        stateNameForAutocomplete={STATE_NAME.USER_LIST}
        getAutocompleteList={getUserList}
        handleOpenCreateUpdateModal={handleOpenCreateUpdatePost}
        handleSetTitleAndActionType={handleSetTitleAndActionType}
        handleCloseCreateUpdateModal={handleCloseCreateUpdatePost}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default Post