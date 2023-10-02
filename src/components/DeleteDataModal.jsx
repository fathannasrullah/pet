import { forwardRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

function DeleteDataModal({
  source = 'Post',
  open,
  selectedData,
  deleteDataLoading,
  handleClose,
  handleDeleteData,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Are you sure want to delete ${selectedData.owner.firstName}'s ${source}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>no</Button>
        <Button
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