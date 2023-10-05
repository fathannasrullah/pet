import { isEmpty } from 'lodash'
import { initialInputPost } from './initial-input-post'

export const generateInputCreateUpdatePost = (actionType, postDetails) => {
  let generatedData = initialInputPost

  if (actionType === 'edit' && !isEmpty(postDetails)) {
    generatedData = generatedData.map((input) => {
      const { name } = input
      const { id, text, image, likes, tags, owner } = postDetails

      if (name === 'owner') return { ...input, value: owner }
      if (name === 'text') return { ...input, value: text }
      if (name === 'image') return { ...input, value: image }
      if (name === 'likes') return { ...input, value: likes }
      if (name === 'tags') return { ...input, value: tags }
      if (name === 'id') return { ...input, value: id}
    })
  }

  return generatedData
}