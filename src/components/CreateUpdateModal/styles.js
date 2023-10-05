import { Box, Dialog, DialogTitle, Typography, styled } from '@mui/material'

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    width: '93vw',
    minHeight: '60vh',
    padding: '20px',
    borderRadius: '50px'
  }
}))

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  textAlign: 'center',
  textTransform: 'uppercase',
  '& button': {
    position: 'absolute',
    top: '20px',
    right: '20px'
  }
}))

export const StyledHeading= styled(Typography)(() => ({
  textAlign: 'center',
  fontWeight: '600',
  textTransform: 'uppercase',
  fontSize: '1.5rem'
}))

export const StyledSubHeading= styled(Typography)(() => ({
  textAlign: 'left',
  fontWeight: '600'
}))

export const StyledFormControl= styled(Box)(() => ({
  margin: '20px 0',
  color: 'white'
}))
