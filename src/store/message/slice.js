import { createSlice } from '@reduxjs/toolkit'

import { STORE_NAME, TYPE_MESSAGES } from '../../utils/constant'

const initialState = {
  primaryText: '',
  secondaryText: '',
  paramsTextPrimary: {},
  paramsTextSecondary: {},
  code: '',
  variant: '',
  isShowingImage: false,
  isShowMessage: false,
  typeMessage: TYPE_MESSAGES.DIALOG
}

const messageSlice = createSlice({
  name: STORE_NAME.MESSAGE,
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isShowMessage: true,
      }
    },
    clearMessage: () => {
      return {
        ...initialState,
      }
    }
  }
})

const { reducer, actions } = messageSlice

export const { setMessage, clearMessage } = actions

export default reducer