import axios from 'axios'
import { isEmpty } from 'lodash'
import { APP_ID } from '../constant'

/**
 * @param { string } endpoint API endpoint url
 * @param { object } listParams params for get data
 * @returns 
 * async function for get list data
 */
export const creatorListService = async(endpoint, listParams) => {
  if (!APP_ID) return null

  if (!isEmpty(listParams) && typeof listParams === 'object') {
    return await axios({
      method: 'GET',
      url: endpoint,
      headers: {
        'app-id': APP_ID
      },
      params: {
        ...listParams
      }
    })
  } else {
    return await axios({
      method: 'GET',
      url: endpoint,
      headers: {
        'app-id': APP_ID
      }
    })
  }
}

/**
 * @param { string } endpoint API endpoint url
 * @param { string } value unique value for get data base on user typing
 * @param { string } endURL end of endpoint url 
 * @returns  
 * async function for get list base on search
 */
export const creatorSearchService = async(endpoint, value, endURL) => {
  if (!APP_ID) return null

  const dinamicEndpoint = `${endpoint}/${value}/${endURL}`
  
  return await axios({
    method: 'GET',
    url: dinamicEndpoint,
    headers: {
      'app-id': APP_ID
    }
  })
}

/**
 * @param { string } endpoint API endpoint url
 * @param { string } id unique id for get data base on id
 * @returns  
 * async function for get detail data
 */
export const creatorDetailService = async(endpoint, ID) => {
  if (!APP_ID || !ID) return null

  const endpointWithID = `${endpoint}/${ID}`
  
  return await axios({
    method: 'GET',
    url: endpointWithID,
    headers: {
      'app-id': APP_ID
    }
  })
}

/**
 * @param { string } endpoint, API endpoint url
 * @param { object } bodyAddData, data of body for send into BE
 * @param { function } generalizeData, function for generalize data before send
 * @returns 
 * async function for handling add data after generalized data
 */
export const creatorAddService = async (endpoint, bodyAddData, generalizeData) => {
  if (!APP_ID) return null

  if (typeof generalizeData === 'function') bodyAddData = generalizeData(bodyAddData)

  return await axios({
    method: 'POST',
    url: endpoint,
    headers: {
      'app-id': APP_ID,
    },
    data: {
      ...bodyAddData,
    }
  })
}

/**
 * @param { string } endpoint, API endpoint url
 * @param { number } ID, unique id for update data
 * @param { object } bodyUpdateData, data of body for send into BE
 * @param { function } generalizeData, function for generalize data before send into BE
 * @returns 
 * async function for handling update data after generalized data
 */
export const creatorUpdateService = async (endpoint, ID, bodyUpdateData) => {
  if (!APP_ID || !ID) return null

  const endpointWithID = `${endpoint}/${ID}`

  //if (typeof generalizeData === 'function') bodyUpdateData = generalizeData(bodyUpdateData)

  return await axios({
    method: 'PUT',
    url: endpointWithID,
    headers: {
      'app-id': APP_ID,
    },
    data: {
      ...bodyUpdateData,
    }
  })
}

/**
 * @param { string } endpoint, API endpoint url
 * @param { number } ID, unique id for delete data
 * @returns 
 * async function for handling delete data
 */
export const creatorDeleteService = async (endpoint, ID) => {
  if (!APP_ID || !ID) return null

  const endpointWithID = `${endpoint}/${ID}`

  return await axios({
    method: 'DELETE',
    url: endpointWithID,
    headers: {
      'app-id': APP_ID,
    }
  })
}