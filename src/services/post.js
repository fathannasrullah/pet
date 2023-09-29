import { creatorAddService, creatorDeleteService, creatorListService, creatorUpdateService } from '../utils/helpers/creator-service-helper'
import { SKUY_GASKEUN_API_URL_POST, SKUY_GASKEUN_API_URL_POST_CREATE } from '../utils/constant'

export const getPostListService = async (listParams) => {
  return (
    await creatorListService(
      SKUY_GASKEUN_API_URL_POST,
      listParams
    )
  )
}

export const createPostService = async (addBody) => {
  return (
    await creatorAddService(
      SKUY_GASKEUN_API_URL_POST_CREATE,
      addBody,
    )
  )
}

export const updatePostService = async (updateBody) => {
  const { id } = updateBody

  return (
    await creatorUpdateService(
      SKUY_GASKEUN_API_URL_POST,
      id,
      updateBody
    )
  )
}

export const deletePost = async (deleteParams) => {
  const { id } = deleteParams

  return await (
    creatorDeleteService(
      SKUY_GASKEUN_API_URL_POST,
      id,
    )
  )
}