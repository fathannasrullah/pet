export const initialInputPost = [
    {
      name: 'id',
      value: null
    },
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
      onChange: (value) => console.log('vakue :', value)
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
        minLength: {
          value: 6,
          message: '6 characters min'
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
      value: '',
      validation: {
        required: {
          value: false
        }
      },
    },
    {
      isInput: true,
      label: 'Likes',
      name: 'likes',
      type: 'number',
      value: 0,
      validation: {
        required: {
          value: false
        },
        valueAsNumber: true,
      },
    },
    {
      isAutocompleteTag: true,
      label: 'Tags',
      name: 'tags',
      value: [],
      validation: {
        required: {
          value: false
        }
      },
    }
]