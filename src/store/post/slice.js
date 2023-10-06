import { createSlice } from '@reduxjs/toolkit'

import { REQUEST_STATUS, STATE_NAME, STORE_NAME } from '../../utils/constant'

import { addPost, deletePost, getHomeList, getPostList, getRefreshPostList, getSearchPostByTag, updatePost } from './action'


const initialState = {
  requestStatus: REQUEST_STATUS.BASE_IDDLE,
  [STATE_NAME.POST_LIST]: {},
  [STATE_NAME.HOME_LIST]: {}
}

const postSlice = createSlice({
  name: STORE_NAME.POST,
  initialState,
  reducers: {
    getHomeList,
    getSearchPostByTag,
    getPostList,
    getRefreshPostList,
    addPost,
    updatePost,
    deletePost
  },
  extraReducers: (builder) => {
    // home list
    builder.addCase(getHomeList.fulfilled, (state, action) => {
      state[STATE_NAME.HOME_LIST] = action.payload[STATE_NAME.HOME_LIST] || {}
      state.requestStatus = REQUEST_STATUS.POST_LIST_SUCCESS
    }),
    builder.addCase(getHomeList.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.POST_LIST_PENDING
    }),
    builder.addCase(getHomeList.rejected, (state) => {
      state[STATE_NAME.HOME_LIST] = {}
      state.requestStatus = REQUEST_STATUS.POST_LIST_FAILED
    }),
    // search post by tag
    builder.addCase(getSearchPostByTag.fulfilled, (state, action) => {
      state[STATE_NAME.HOME_LIST] = action.payload[STATE_NAME.HOME_LIST] || {}
      state.requestStatus = REQUEST_STATUS.POST_LIST_SUCCESS
    }),
    builder.addCase(getSearchPostByTag.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.POST_LIST_PENDING
    }),
    builder.addCase(getSearchPostByTag.rejected, (state) => {
      state[STATE_NAME.HOME_LIST] = {}
      state.requestStatus = REQUEST_STATUS.POST_LIST_FAILED
    }),
    // post list
    builder.addCase(getPostList.fulfilled, (state, action) => {
      const { page } = action.payload[STATE_NAME.POST_LIST]

      state[STATE_NAME.POST_LIST] = page === 1
        ? action.payload[STATE_NAME.POST_LIST] || {}
        : {
            ...action.payload[STATE_NAME.POST_LIST],
            data: [...state[STATE_NAME.POST_LIST].data, ...action.payload[STATE_NAME.POST_LIST].data]
          }
      state.requestStatus = REQUEST_STATUS.POST_LIST_SUCCESS
    }),
    builder.addCase(getPostList.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.POST_LIST_PENDING
    }),
    builder.addCase(getPostList.rejected, (state) => {
      state[STATE_NAME.POST_LIST] = {}
      state.requestStatus = REQUEST_STATUS.POST_LIST_FAILED
    }),
    // refresh post list
    builder.addCase(getRefreshPostList.fulfilled, (state, action) => {
      const newData = [...state[STATE_NAME.POST_LIST].data, ...action.payload[STATE_NAME.POST_LIST].data]
      const newUniqueData = [...new Map(newData.map((post) => [post.id, post])).values()]
      
      state[STATE_NAME.POST_LIST] = {
        ...action.payload[STATE_NAME.POST_LIST],
        data: newUniqueData
      } || {}
      state.requestStatus = REQUEST_STATUS.POST_LIST_SUCCESS
    }),
    builder.addCase(getRefreshPostList.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.POST_LIST_PENDING
    }),
    builder.addCase(getRefreshPostList.rejected, (state) => {
      state[STATE_NAME.POST_LIST] = {}
      state.requestStatus = REQUEST_STATUS.POST_LIST_FAILED
    }),
    // add post
    builder.addCase(addPost.fulfilled, (state) => {
      state.requestStatus = REQUEST_STATUS.POST_CREATE_SUCCESS
    }),
    builder.addCase(addPost.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.POST_CREATE_PENDING
    }),
    builder.addCase(addPost.rejected, ( state ) => {
      state.requestStatus = REQUEST_STATUS.POST_CREATE_FAILED
    }),
    // update post
    builder.addCase(updatePost.fulfilled, (state) => {
      state.requestStatus = REQUEST_STATUS.POST_UPDATE_SUCCESS
    }),
    builder.addCase(updatePost.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.POST_UPDATE_PENDING
    }),
    builder.addCase(updatePost.rejected, ( state ) => {
      state.requestStatus = REQUEST_STATUS.POST_UPDATE_FAILED
    }),
    // delete post
    builder.addCase(deletePost.fulfilled, ( state ) => {
      state.requestStatus = REQUEST_STATUS.POST_DELETE_SUCCESS
    }),
    builder.addCase(deletePost.pending, ( state ) => {
      state.requestStatus = REQUEST_STATUS.POST_DELETE_PENDING
    }),
    builder.addCase(deletePost.rejected, ( state ) => {
      state[STATE_NAME.POST_LIST] = {}
      state.requestStatus = REQUEST_STATUS.POST_DELETE_FAILED
    })
  }
})

export default postSlice.reducer