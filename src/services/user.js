import { creatorAddService, creatorDeleteService, creatorDetailService, creatorListService, creatorUpdateService } from '../utils/helpers/creator-service-helper'
import { SKUY_GASKEUN_API_URL_USER, SKUY_GASKEUN_API_URL_USER_CREATE } from '../utils/constant'

export const getUserListService = async (listParams) => {
  return (
    await creatorListService(
      SKUY_GASKEUN_API_URL_USER,
      listParams
    )
  )
}

export const getUserDetailService = async (ID) => {
  return (
    await creatorDetailService(
      SKUY_GASKEUN_API_URL_USER,
      ID
    )
  )
}

export const addUserService = async (addBody) => {
  return (
    await creatorAddService(
      SKUY_GASKEUN_API_URL_USER_CREATE,
      addBody,
    )
  )
}

export const updateUserService = async (updateBody) => {
  const { id } = updateBody

  return (
    await creatorUpdateService(
      SKUY_GASKEUN_API_URL_USER,
      id,
      updateBody
    )
  )
}

export const deleteUserService = async (ID) => {
return (
    await creatorDeleteService(
      SKUY_GASKEUN_API_URL_USER,
      ID,
    )
  )
}