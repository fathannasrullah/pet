import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { isEmpty } from 'lodash'

import { addPost, deletePost, getPostList, getRefreshPostList, updatePost } from '../store/post/action'
import { getUserList } from '../store/user/action'

import { postTableColumns } from '../utils/table-colums/post-table-columns'
import { 
  STORE_NAME,
  STATE_NAME,
  REQUEST_STATUS
} from '../utils/constant'

import ListTableView from '../components/ListTableView'
import { generateInputCreateUpdatePost } from '../utils/inputs/generateInputCreateUpdatePost'

const inputs = [
  {
    isAutocomplete: true,
    label: 'Owner',
    name: 'owner',
    value: '',
    validation: {
      required: {
        value: true,
        message: 'required',
      }
    },
  },
  {
    isInput: true,
    isMultiline: true,
    rows: 3,
    label: 'Text',
    name: 'text',
    type: 'text',
    value: '',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
      maxLength: {
        value: 50,
        message: '50 characters max',
      },
    },
  },
  {
    isInput: true,
    label: 'Image URL',
    name: 'image',
    type: 'text',
    value: ''
  },
  {
    isInput: true,
    label: 'Likes',
    name: 'likes',
    type: 'number',
    value: 0
  },
  {
    isAutocompleteTag: true,
    label: 'Tags',
    name: 'tags',
    value: []
  }
]

function Post() {
  const dispatch = useDispatch()

  const [selectedData, setSelectedData] = useState(null)
  const [openImagePreview, setOpenImagePreview] = useState(false)
  const [openDeletePost, setOpenDeletePost] = useState(false)
  const [openCreateUpdatePost, setOpenCreateUpdatePost] = useState(false)
  const [title, setTitle] = useState('add new post')
  const [actionType, setActionType] = useState('create')

  const handleOpenImagePreviewModal = () => setOpenImagePreview(true)
  const handleCloseImagePreviewModal = () => setOpenImagePreview(false)
  const handleOpenDeletePost = () => setOpenDeletePost(true)
  const handleCloseDeletePost = () => setOpenDeletePost(false)
  const handleCloseCreateUpdatePost = () => setOpenCreateUpdatePost(false)
  const handleGetDataSelected = (data) => setSelectedData(JSON.parse(data))
  const handleDeletePost = () => dispatch(deletePost(selectedData.id))

  const handleSetTitleAndActionType = (title, actionType) => {
    setTitle(title)
    setActionType(actionType)
  }
  
  const handleOpenCreateUpdatePost = () => {
    if (actionType === 'edit') handleSetTitleAndActionType('add new post', 'add')
    setOpenCreateUpdatePost(true)
  }

  const handleSubmit = (input) => {
    console.log('login submitted: ', input)
    dispatch(
      actionType === 'create' ? addPost(input) : updatePost(input)
    )
  }
  console.log('img selected :', selectedData)
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
        inputs={generateInputCreateUpdatePost(actionType, selectedData)}
        btnText='post'
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