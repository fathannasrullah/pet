import { createAsyncThunk } from '@reduxjs/toolkit'

import { creatorAddAction, creatorDeleteAction, creatorListOrDetailAction, creatorUpdateAction } from '../../utils/helpers/creator-action-helper'
import { STATE_NAME } from '../../utils/constant'

import { addUserService, deleteUserService, getUserDetailService, getUserListService, updateUserService } from '../../services/user'

export const getUserList = createAsyncThunk(
  'user/list',
  async (listParams, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParams,
        getUserListService,
        STATE_NAME.USER_LIST,
      )
    )
  }
)

export const getRefreshUserList = createAsyncThunk(
  'user/refresh-list',
  async (listParams, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParams,
        getUserListService,
        STATE_NAME.USER_LIST,
      )
    )
  }
)

export const getUserDetail = createAsyncThunk(
  'user/detail',
  async (detailID, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        detailID,
        getUserDetailService,
        STATE_NAME.USER_DETAIL
      )
    )
  }
)

export const addUser = createAsyncThunk(
  'user/add',
  async (addBody, thunkAPI) => {
    return (
      await creatorAddAction(
        thunkAPI,
        addBody,
        addUserService,
        'Successfull Add User',
        'Failed Add User'
      )
    )
  }
)

export const updateUser = createAsyncThunk(
  'user/update',
  async( updateBody, thunkAPI ) => {
    return (
      await creatorUpdateAction(
        thunkAPI,
        updateBody,
        updateUserService,
        'Successfull Update User',
        'Failed Update User'
      )
    )
  }
)

export const deleteUser = createAsyncThunk(
  'user/delete',
  async( deleteParams, thunkAPI ) => {
    return (
      await creatorDeleteAction(
        thunkAPI,
        deleteParams,
        deleteUserService,
        'Successfull Delete User',
        'Failed Delete User'
      )
    )
  }
)