export const initialInputUser = [
  {
    isSelect: true,
    label: 'Title',
    name: 'title',
    value: '',
  },
  {
    isInput: true,
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    value: '',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
    }
  },
  {
    isInput: true,
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
    value: '',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
    }
  },
  {
    isInput: true,
    label: 'Email',
    name: 'email',
    value: '',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'not valid',
      },
    }
  },
  {
    isInput: true,
    label: 'Picture URL',
    name: 'picture',
    type: 'text',
    value: ''
  },
]