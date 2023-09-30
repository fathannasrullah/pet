import { createSlice } from '@reduxjs/toolkit'

import { REQUEST_STATUS, STATE_NAME, STORE_NAME } from '../../utils/constant'

import { addUser, deleteUser, getUserList, updateUser } from './action'


const initialState = {
  requestStatus: REQUEST_STATUS.BASE_IDDLE,
  [STATE_NAME.USER_LIST]: {}
}

const userSlice = createSlice({
  name: STORE_NAME.USER,
  initialState,
  reducers: {
    getUserList,
    addUser,
    updateUser,
    deleteUser
  },
  extraReducers: (builder) => {
    // user list
    builder.addCase(getUserList.fulfilled, (state, action) => {
      const { page } = action.payload[STATE_NAME.USER_LIST]

      state[STATE_NAME.USER_LIST] = page === 0
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