import { createSlice } from '@reduxjs/toolkit'

import { REQUEST_STATUS, STATE_NAME, STORE_NAME } from '../../utils/constant'

import { addUser, deleteUser, getRefreshUserList, getUserDetail, getUserList, updateUser } from './action'

const initialState = {
  requestStatus: REQUEST_STATUS.BASE_IDDLE,
  [STATE_NAME.USER_LIST]: {},
  [STATE_NAME.USER_DETAIL]: {}
}

const userSlice = createSlice({
  name: STORE_NAME.USER,
  initialState,
  reducers: {
    getUserList,
    getRefreshUserList,
    getUserDetail,
    addUser,
    updateUser,
    deleteUser
  },
  extraReducers: (builder) => {
    // user list
    builder.addCase(getUserList.fulfilled, (state, action) => {
      const { page } = action.payload[STATE_NAME.USER_LIST]

      state[STATE_NAME.USER_LIST] = page === 1
        ? action.payload[STATE_NAME.USER_LIST] || {}
        : {
            ...action.payload[STATE_NAME.USER_LIST],
            data: [...state[STATE_NAME.USER_LIST].data, ...action.payload[STATE_NAME.USER_LIST].data]
          }
      state.requestStatus = REQUEST_STATUS.USER_LIST_SUCCESS
    }),
    builder.addCase(getUserList.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_LIST_PENDING
    }),
    builder.addCase(getUserList.rejected, (state) => {
      state[STATE_NAME.POST_LIST] = {}
      state.requestStatus = REQUEST_STATUS.USER_LIST_FAILED
    }),
    // refresh user list
    builder.addCase(getRefreshUserList.fulfilled, (state, action) => {
      const newData = [...state[STATE_NAME.USER_LIST].data, ...action.payload[STATE_NAME.USER_LIST].data]
      const newUniqueData = [...new Map(newData.map((user) => [user.id, user])).values()]
      
      state[STATE_NAME.USER_LIST] = {
        ...action.payload[STATE_NAME.USER_LIST],
        data: newUniqueData
      } || {}
      state.requestStatus = REQUEST_STATUS.USER_LIST_SUCCESS
    }),
    builder.addCase(getRefreshUserList.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_LIST_PENDING
    }),
    builder.addCase(getRefreshUserList.rejected, (state) => {
      state[STATE_NAME.USER_LIST] = {}
      state.requestStatus = REQUEST_STATUS.USER_LIST_FAILED
    }),
    // user detail
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state[STATE_NAME.USER_DETAIL] = action.payload[STATE_NAME.USER_DETAIL] || {}
      state.requestStatus = REQUEST_STATUS.USER_DETAIL_SUCCESS
    }),
    builder.addCase(getUserDetail.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_DETAIL_PENDING
    }),
    builder.addCase(getUserDetail.rejected, (state) => {
      state[STATE_NAME.USER_DETAIL] = {}
      state.requestStatus = REQUEST_STATUS.USER_DETAIL_FAILED
    }),
    // add user
    builder.addCase(addUser.fulfilled, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_CREATE_SUCCESS
    }),
    builder.addCase(addUser.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_CREATE_PENDING
    }),
    builder.addCase(addUser.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_CREATE_FAILED
    }),
    // update user
    builder.addCase(updateUser.fulfilled, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_UPDATE_SUCCESS
    }),
    builder.addCase(updateUser.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_UPDATE_PENDING
    }),
    builder.addCase(updateUser.rejected, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_UPDATE_FAILED
    }),
    // delete user
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_DELETE_SUCCESS
    }),
    builder.addCase(deleteUser.pending, (state) => {
      state.requestStatus = REQUEST_STATUS.USER_DELETE_PENDING
    }),
    builder.addCase(deleteUser.rejected, (state) => {
      state[STATE_NAME.USER_LIST] = {}
      state.requestStatus = REQUEST_STATUS.USER_DELETE_FAILED
    })
  }
})

export default userSlice.reducer