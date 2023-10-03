import { Box, DialogTitle, Typography, styled } from '@mui/material'



export const StyledDialogTitle = styled(DialogTitle)(() => ({
  textAlign: 'center',
  textTransform: 'uppercase'
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
