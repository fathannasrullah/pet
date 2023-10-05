import { isEmpty } from 'lodash'
import { initialInputUser } from './initial-input-user'

export const generateInputCreateUpdateUser = (actionType, userDetails) => {
  let generatedData = initialInputUser

  if (actionType === 'edit' && !isEmpty(userDetails)) {
    generatedData = generatedData.map((input) => {
      const { name } = input
      const { title, firstName, lastName, email, picture } = userDetails

      if (name === 'title') return { ...input, value: title }
      if (name === 'firstName') return { ...input, value: firstName }
      if (name === 'lastName') return { ...input, value: lastName }
      if (name === 'email') return { ...input, value: email }
      if (name === 'picture') return { ...input, value: picture }
    })

    generatedData = [
      ...generatedData,
      { id: userDetails.id }
    ]
  }

  return generatedData
}