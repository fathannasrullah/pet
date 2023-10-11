import { forwardRef, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import { SecurityUpdateGood } from '@mui/icons-material'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

function DeleteDataModal({
  source = 'Post',
  open,
  selectedData,
  deleteDataLoading,
  deleteDataSuccess,
  setPage,
  handleClose,
  handleDeleteData,
  handleFetchDataType
}) {
  useEffect(() => {
    if (deleteDataSuccess) {
      setPage(0)
      handleFetchDataType('refresh-page')
      handleClose()
    }
  }, [deleteDataSuccess])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Are you sure want to delete ${selectedData}'s ${source}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>no</Button>
        <Button variant='contained'
          disabled={deleteDataLoading}
          onClick={handleDeleteData}
        >
          {deleteDataLoading ? 'deleting..' : 'yes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDataModal