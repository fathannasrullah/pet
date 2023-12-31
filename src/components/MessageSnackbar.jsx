import { useState } from 'react'
import { Alert, AlertTitle, Snackbar } from '@mui/material'

function MessageSnackbar({
  openMessage,
  variant,
  primaryText,
  secondaryText,
  handleCloseMessage
}) {
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'right',
  })
  const messageText = 'message text'
  const { vertical, horizontal } = state
  const showingPrimaryText = typeof primaryText === 'object' ? messageText : primaryText

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={openMessage}
      autoHideDuration={5000}
      onClose={handleCloseMessage}
      key={vertical + horizontal}
    >
      <Alert onClose={handleCloseMessage} severity={variant} sx={{ width: '100%' }}>
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