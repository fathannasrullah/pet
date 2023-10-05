import { isEmpty } from 'lodash'
import { initialInputUser } from './initial-input-user'

export const generateInputCreateUpdateUser = (actionType, userDetails) => {
  let generatedData = initialInputUser

  if (actionType === 'edit' && !isEmpty(userDetails)) {
    generatedData = generatedData.map((input) => {
      const { name } = input
      const { id, title, firstName, lastName, email, picture } = userDetails

      if (name === 'title') return { ...input, defaultValue: title }
      if (name === 'firstName') return { ...input, value: firstName }
      if (name === 'lastName') return { ...input, value: lastName }
      if (name === 'email') return { ...input, value: email }
      if (name === 'picture') return { ...input, value: picture }
      if (name === 'id') return { ...input, value: id }
    })
  }
  
  return generatedData
}