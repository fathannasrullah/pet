export const initialInputPost = [
    {
      isAutocomplete: true,
      label: 'Owner',
      name: 'owner',
      value: '',
      validation: {
        required: {
          value: true,
          message: 'required',
        }
      },
    },
    {
      isInput: true,
      isMultiline: true,
      rows: 3,
      label: 'Text',
      name: 'text',
      type: 'text',
      value: '',
      validation: {
        required: {
          value: true,
          message: 'required',
        },
        maxLength: {
          value: 50,
          message: '50 characters max',
        },
      },
    },
    {
      isInput: true,
      label: 'Image URL',
      name: 'image',
      type: 'text',
      value: ''
    },
    {
      isInput: true,
      label: 'Likes',
      name: 'likes',
      type: 'number',
      value: 0
    },
    {
      isAutocompleteTag: true,
      label: 'Tags',
      name: 'tags',
      value: []
    }
]