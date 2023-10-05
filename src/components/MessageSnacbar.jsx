import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { STORE_NAME } from '../utils/constant'

function MessageSnackbar() {
  const {
    isShowMessage,
    variant,
    primaryText,
    secondaryText,
    paramsTextSecondary,
  } = useSelector((state) => state[STORE_NAME.MESSAGE])
  const messageText = 'message text'

  const [state, setState] = useState({
    open: isShowMessage,
    vertical: 'top',
    horizontal: 'right',
  })

  const { vertical, horizontal, open } = state

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const showingPrimaryText = typeof primaryText === 'object' ? messageText : primaryText
  console.log('message here : ', primaryText, isShowMessage)
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