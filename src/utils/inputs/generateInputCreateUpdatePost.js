import { initialInputPost } from './initial-input-post'

export const generateInputCreateUpdatePost = (actionType, postDetails) => {
  let generatedData = initialInputPost

  if (actionType === 'edit') {
    generatedData = generatedData.map((input) => {
      const { name } = input
      const { id, text, image, likes, tags } = postDetails

      if (name === 'owner') return { ...input, value: id }
      if (name === 'text') return { ...input, value: text }
      if (name === 'image') return { ...input, value: image }
      if (name === 'likes') return { ...input, value: likes }
      if (name === 'tags') return { ...input, value: tags }
    })
  }
  console.log('data gen', generatedData)
  return generatedData
}