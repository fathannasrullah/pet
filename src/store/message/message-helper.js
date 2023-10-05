import { TYPE_MESSAGES, VARIANT_MESSAGES, messageConstants } from '../../utils/constant'

import { setMessage } from './slice'

const getMessageFromResponseData = (responseData) => {
  if (!responseData.error) {
    if (typeof responseData !== 'object') return responseData
    return responseData
  }
  // getting message from main response 
  const message = responseData
  // key object on message
  const getKeysMessage = Object.keys(message)

  return getMessageFromResponseData(message[getKeysMessage[0]])
}

const createMessage = (
  primaryText,
  secondaryText,
  code,
  isShowingImage,
  variant,
  typeMessage,
  paramsTextPrimary,
  paramsTextSecondary
) => {
  return {
    primaryText,
    secondaryText,
    code,
    isShowingImage,
    variant,
    typeMessage,
    paramsTextPrimary,
    paramsTextSecondary
  }
}

/**
 * @param { function } dispatch redux function for triggering action
 * @param { string } primaryText message for primary text
 * @param { string } secondaryText message for secondary text
 * @param { object } paramsTextPrimary params text for passing on primary text
 * @param { object } paramsTextSecondary params text for passing on secondary text
 * @returns
 * action for set succcess message with create message
 */
const successMessage = (
  dispatch,
  primaryText,
  secondaryText = '',
  paramsTextPrimary,
  paramsTextSecondary
) => {
  return dispatch(
    setMessage(
      createMessage(
        primaryText,
        secondaryText,
        200,
        false,
        VARIANT_MESSAGES.SUCCESS,
        TYPE_MESSAGES.SNACKBAR,
        paramsTextPrimary,
        paramsTextSecondary
      )
    )
  )
}

// failed mesaage for all situation
const failedMessage = (
  dispatch,
  primaryText,
  secondaryText,
  isShowingImage = true,
  paramsTextPrimary = {},
  paramsTextSecondary = {}
) => {
  return dispatch(
    setMessage(
      createMessage(
        primaryText,
        secondaryText,
        400,
        isShowingImage,
        VARIANT_MESSAGES.ERROR,
        secondaryText && isShowingImage ? TYPE_MESSAGES.DIALOG : TYPE_MESSAGES.SNACKBAR,
        paramsTextPrimary,
        paramsTextSecondary
      )
    )
  )
}

const serverInternalError = (dispatch) => {
  return dispatch(
    setMessage(
      createMessage(
        'Error',
        'internal server error',
        500,
        true,
        VARIANT_MESSAGES.ERROR,
        TYPE_MESSAGES.DIALOG
      )
    )
  )
}

const messageHelper = {
  getMessageFromResponseData,
  successMessage,
  failedMessage,
  serverInternalError,
}

export default messageHelper