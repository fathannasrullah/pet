import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { useState } from 'react'

function MessageSnackbar({ openMessage, primaryText, secondaryText }) {
  const messageText = 'message text'

  const [state, setState] = useState({
    open: openMessage,
    vertical: 'top',
    horizontal: 'right',
  })
  const { vertical, horizontal, open } = state

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const showingPrimaryText = typeof primaryText === 'object' ? messageText : primaryText

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      //message={}
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
        <AlertTitle>
          <strong>
            {showingPrimaryText}
          </strong>
        </AlertTitle>
        {secondaryText}
      </Alert>
    </Snackbar>
  )
}

export default MessageSnackbar