/* API Url */
export const SKUY_GASKEUN_API_URL = 'https://dummyapi.io/data/v1'
export const SKUY_GASKEUN_API_URL_USER = `${SKUY_GASKEUN_API_URL}/user`
export const SKUY_GASKEUN_API_URL_USER_CREATE = `${SKUY_GASKEUN_API_URL_USER}/create`
export const SKUY_GASKEUN_API_URL_POST = `${SKUY_GASKEUN_API_URL}/post`
export const SKUY_GASKEUN_API_URL_POST_CREATE = `${SKUY_GASKEUN_API_URL_POST}/create`
export const SKUY_GASKEUN_API_URL_POST_SEARCH_BY_TAG = `${SKUY_GASKEUN_API_URL}/tag`

/* Headers */
export const APP_ID = '62996cb2689bf0731cb00285'

/* Store Name */
export const STORE_NAME = {
  USER: 'user',
  POST: 'post',
  MESSAGE: 'message'
}

/* Global State Name */
export const STATE_NAME = {
  USER_LIST: 'userListState',
  USER_DETAIL: 'userDetailState',
  POST_LIST: 'postListState',
  POST_DETAIL: 'postDetailState',
  HOME_LIST: 'homeListState'
}

/* Request Status */
export const REQUEST_STATUS = {
  /* Base */
  BASE_IDDLE: 'iddle',
  BASE_PENDDING: 'pending',
  BASE_SUCCES: 'success',
  BASE_FAILED: 'failed',
  /* User List */
  USER_LIST_PENDING: 'user-list-pending',
  USER_LIST_SUCCESS: 'user-list-success',
  USER_LIST_FAILED: 'user-list-failed',
  /* User detail */
  USER_DETAIL_PENDING: 'user-detail-pending',
  USER_DETAIL_SUCCESS: 'user-detail-success',
  USER_DETAIL_FAILED: 'user-detail-failed',
  /* User Create */
  USER_CREATE_PENDING: 'user-create-pending',
  USER_CREATE_SUCCESS: 'user-create-success',
  USER_CREATE_FAILED: 'user-create-failed',
  /* User Update */
  USER_UPDATE_PENDING: 'user-update-pending',
  USER_UPDATE_SUCCESS: 'user-update-success',
  USER_UPDATE_FAILED: 'user-update-failed',
  /* User Delete */
  USER_DELETE_PENDING: 'user-delete-pending',
  USER_DELETE_SUCCESS: 'user-delete-success',
  USER_DELETE_FAILED: 'user-delete-failed',
  /* Post List */
  POST_LIST_PENDING: 'post-list-pending',
  POST_LIST_SUCCESS: 'post-list-success',
  POST_LIST_FAILED: 'post-list-failed',
  /* Post Detail */
  POST_DETAIL_PENDING: 'post-detail-pending',
  POST_DETAIL_SUCCESS: 'post-detail-success',
  POST_DETAIL_FAILED: 'post-detail-failed',
  /* Post Create */
  POST_CREATE_PENDING: 'post-create-pending',
  POST_CREATE_SUCCESS: 'post-create-success',
  POST_CREATE_FAILED: 'post-create-failed',
  /* Post Update */
  POST_UPDATE_PENDING: 'post-update-pending',
  POST_UPDATE_SUCCESS: 'post-update-success',
  POST_UPDATE_FAILED: 'post-update-failed',
  /* Post Delete */
  POST_DELETE_PENDING: 'post-delete-pending',
  POST_DELETE_SUCCESS: 'post-delete-success',
  POST_DELETE_FAILED: 'post-delete-failed'
  
}

/* All Message */
export const messageConstants = {
  'CONTAINER_MESSAGE': 'data'
}

export const VARIANT_MESSAGES = {
  ERROR: 'error',
  FORBIDDEN: 'forbidden',
  SUCCESS: 'success'
}

export const TYPE_MESSAGES = {
  DIALOG: 'dialog',
  SNACKBAR: 'snackbar'
}