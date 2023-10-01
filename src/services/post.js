import { creatorAddService, creatorDeleteService, creatorListService, creatorSearchService, creatorUpdateService } from '../utils/helpers/creator-service-helper'
import { SKUY_GASKEUN_API_URL_POST, SKUY_GASKEUN_API_URL_POST_CREATE, SKUY_GASKEUN_API_URL_POST_SEARCH_BY_TAG } from '../utils/constant'

export const getSearchPostByTagService = async(tagValue) => {
  return (
    await creatorSearchService(
      SKUY_GASKEUN_API_URL_POST_SEARCH_BY_TAG,
      tagValue,
      'post'
    )
  )
}

export const getPostListService = async (listParams) => {
  return (
    await creatorListService(
      SKUY_GASKEUN_API_URL_POST,
      listParams
    )
  )
}

export const addPostService = async (addBody) => {
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

export const deletePostService = async (deleteParams) => {
  const { id } = deleteParams

  return await (
    creatorDeleteService(
      SKUY_GASKEUN_API_URL_POST,
      id,
    )
  )
}