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
      placeholder: 'Choose owner',
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
      placeholder: 'Type what you want to post',
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
      placeholder: 'Type your image url link',
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
      value: '',
      placeholder: 'Give your likes',
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
      placeholder: 'Type your tags then press enter',
      validation: {
        required: {
          value: false
        }
      },
    }
]