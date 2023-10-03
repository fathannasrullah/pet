import { Modal, Box, Stack, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function ImagePreviewModal({ image, open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ margin:'auto 0' }}>
        <Stack direction='row' justifyContent='center' mb={5}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <img src={image} width='500px' />
      </Box>
    </Modal>
  )
}

export default ImagePreviewModal