import { createAsyncThunk } from '@reduxjs/toolkit'

import { creatorAddAction, creatorDeleteAction, creatorListOrDetailAction, creatorUpdateAction } from '../../utils/helpers/creator-action-helper'
import { STATE_NAME } from '../../utils/constant'

import { addPostService, deletePostService, getPostListService, getSearchPostByTagService, updatePostService } from '../../services/post'

export const getHomeList = createAsyncThunk(
  'post/list-for-home',
  async (listParams, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParams,
        getPostListService,
        STATE_NAME.HOME_LIST,
      )
    )
  }
)

export const getSearchPostByTag = createAsyncThunk(
  'post/search-by-tag',
  async (searchParam, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        searchParam,
        getSearchPostByTagService,
        STATE_NAME.HOME_LIST,
      )
    )
  }
)

export const getPostList = createAsyncThunk(
  'post/list',
  async (listParams, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParams,
        getPostListService,
        STATE_NAME.POST_LIST,
      )
    )
  }
)

export const getRefreshPostList = createAsyncThunk(
  'post/refresh-list',
  async (listParams, thunkAPI) => {
    return (
      await creatorListOrDetailAction(
        thunkAPI,
        listParams,
        getPostListService,
        STATE_NAME.POST_LIST,
      )
    )
  }
)

export const addPost = createAsyncThunk(
  'post/add',
  async (addBody, thunkAPI) => {
    return (
      await creatorAddAction(
        thunkAPI,
        addBody,
        addPostService,
        'Success Add Post',
        'Failed Add Post',
      )
    )
  }
)

export const updatePost = createAsyncThunk(
  'post/update',
  async (updateBody, thunkAPI) => {
    return (
      await creatorUpdateAction(
        thunkAPI,
        updateBody,
        updatePostService,
        'Successfull Update Post',
        'Failed Update Post',
        {}, {},
      )
    )
  }
)

export const deletePost = createAsyncThunk(
  'post/delete',
  async (deleteParams, thunkAPI) => {
    return (
      await creatorDeleteAction(
        thunkAPI,
        deleteParams,
        deletePostService,
        'Successfull Delete Post',
        'Failed Delete Post',
        {}, {},
      )
    )
  }
)