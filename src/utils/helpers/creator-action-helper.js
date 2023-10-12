import messageHelper from "../../store/message/message-helper"

/**
 * @param { function } thunkAPI, function from thunk api, that able to reject, or fullfilled
 * @param { object } listOrDetailParams, params object for hitting endpoint
 * @param { function } serviceFunc, function hitting endpoint, from service
 * @param { string } globalStateName, global state name, require for store response data into global state
 * @returns 
 * async function for list or detail data
 */
export const creatorListOrDetailAction = async (
  thunkAPI,
  listOrDetailParams,
  serviceFunc,
  globalStateName,
) => {
  try {
    const response = await serviceFunc(listOrDetailParams)
    if (!response) throw({ response })

    const { data } = response
    if (!data) throw({ response })

    return { 
      [globalStateName]: data
    }
  } catch (error) {
    const { response } = error
    if (!response) {
      return thunkAPI.rejectWithValue(response)
    }

    const { data } = response

    return thunkAPI.rejectWithValue(data)           
  }
}

/**
 * @param { function } thunkAPI function from thunk api
 * @param { function } bodyDataAction body data
 * @param { function } serviceFunc service function for hitting endpoint
 * @param { string } successMessage success message if successfull add data
 * @param { string } errorMessage error message if failed add data
 * @param { string } paramsTextPrimary params text primary message for passing data
 * @param { string } paramsTextSecondary params text secondary message for passing data
 * @returns 
 * async function for add data
 */
export const creatorAddAction = async(
  thunkAPI,
  bodyDataAction,
  serviceFunc,
  successMessage,
  errorMessage,
  paramsTextPrimary={},
  paramsTextSecondary={},
) => {
  try {
    const response = await serviceFunc(bodyDataAction)
    if (!response) throw({ response })

    const { data } = response
    if (!data) throw({ response })

    const responseMessage = messageHelper.getMessageFromResponseData(data)
    if (!responseMessage) {
      messageHelper.successMessage(
        thunkAPI.dispatch,
        successMessage,
        successMessage,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    } else {
      messageHelper.successMessage(
        thunkAPI.dispatch,
        'Success',
        successMessage,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    }

    return thunkAPI.fulfillWithValue(data)
  } catch (error) {
    const { response } = error
    if (!response) {
      messageHelper.serverInternalError(thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(response)
    }

    const { data } = response
    const responseMessage = messageHelper.getMessageFromResponseData(data)
    if (!responseMessage) {
      messageHelper.failedMessage(
        thunkAPI.dispatch,
        errorMessage,
        errorMessage,
        false,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    } else {
      messageHelper.failedMessage(
        thunkAPI.dispatch,
        errorMessage,
        responseMessage,
        false,
        paramsTextPrimary,
        paramsTextSecondary,
        )
      }

      return thunkAPI.rejectWithValue(data)
  }
}

/**
 * @param { function } thunkAPI function from create async thunk 
 * @param { function } bodyDataAction body data
 * @param { function } serviceFunc service function for hitting endpoint
 * @param { string } successMessage success message if succesfull update data
 * @param { string } errorMessage error message if failed update data
 * @param { string } paramsTextPrimary params text primary message for passing data
 * @param { string } paramsTextSecondary params text secondary message for passing data
 * @returns 
 * async function for update data
 */
export const creatorUpdateAction = async(
  thunkAPI,
  bodyDataAction,
  serviceFunc,
  successMessage,
  errorMessage,
  paramsTextPrimary={},
  paramsTextSecondary={},
  showMessage=true
) => {
  try {
    const response = await serviceFunc(bodyDataAction)
    if (!response) throw({ response })

    const { data } = response
    if (!data) throw({ response })

    const responseMessage = messageHelper.getMessageFromResponseData(data)
    if (showMessage) {
      if (!responseMessage) {
        messageHelper.successMessage(
          thunkAPI.dispatch,
          successMessage,
          successMessage,
          paramsTextPrimary,
          paramsTextSecondary,
        )
      } else {
        messageHelper.successMessage(
          thunkAPI.dispatch,
          'Success',
          successMessage,
          paramsTextPrimary,
          paramsTextSecondary,
        )
      }
    }

    return thunkAPI.fulfillWithValue(data)
  } catch (error) {
    const { response } = error
    if (!response) {
      messageHelper.serverInternalError(thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(response)
    }

    const { data } = response
    const responseMessage = messageHelper.getMessageFromResponseData(data)
    if (!responseMessage) {
      messageHelper.failedMessage(
        thunkAPI.dispatch,
        errorMessage,
        errorMessage,
        false,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    } else {
      messageHelper.failedMessage(
        thunkAPI.dispatch,
        errorMessage,
        responseMessage,
        false,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    }

    return thunkAPI.rejectWithValue(data)
  }
}

/**
* @param { function } thunkAPI, function from create async thunk 
* @param { object } paramsDeleteAction, params data
* @param { function } serviceFunc, service function for hitting endpoint
* @param { string } successMessage, success message if successfull delete dsta
* @param { string } errorMessage, error message if failed delete data
* @param { string } paramsTextPrimary, params text primary message for passing data
* @param { string } paramsTextSecondary, params text secondary message for passing data
* @returns 
* async function for delete data
*/
export const creatorDeleteAction = async(
  thunkAPI,
  paramsDeleteAction,
  serviceFunc,
  successMessage,
  errorMessage,
  paramsTextPrimary={},
  paramsTextSecondary={}
) => {
  try {
    const response = await serviceFunc(paramsDeleteAction)
    if (!response) throw({ response })

    const { data } = response
    if (!data) throw({ response })

    const responseMessage = messageHelper.getMessageFromResponseData(data)
    if (!responseMessage) {
      messageHelper.successMessage(
        thunkAPI.dispatch,
        successMessage,
        successMessage,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    } else {
      messageHelper.successMessage(
        thunkAPI.dispatch,
        'Success',
        successMessage,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    }

    return thunkAPI.fulfillWithValue(data)
  } catch (error) {
    const { response } = error
    if (!response) {
      messageHelper.serverInternalError(thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(response)
    }

    const { data } = response
    const responseMessage = messageHelper.getMessageFromResponseData(data)
    if (!responseMessage) {
      messageHelper.failedMessage(
        thunkAPI.dispatch,
        errorMessage,
        errorMessage,
        false,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    } else {
      messageHelper.failedMessage(
        thunkAPI.dispatch,
        errorMessage,
        responseMessage,
        false,
        paramsTextPrimary,
        paramsTextSecondary,
      )
    }

    return thunkAPI.rejectWithValue(data)
  }
}