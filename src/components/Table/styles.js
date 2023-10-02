import { Button, Chip, Grid, Stack, TableContainer, styled } from '@mui/material'

export const StyledTableContainer = styled(TableContainer)(() => ({
  width: '100%',
  height: '69vh',
  '@media (min-height: 767px) and (min-width: 1023px)': {
    height: '75vh'
  }
}))

export const StyledChipContainer = styled(Stack)(() => ({
  display: 'inline'
}))

export const StyledChip = styled(Chip)(() => ({
  display: 'inline',
  margin: '0 2px',
  padding: '5px'
}))

export const StyledImageContainer = styled('div')(() => ({
  margin: 0,
  height: '30px',
  overflow: 'hidden',
  '& img': {
    width: '60px'
  }
}))

export const StyledActionContainer = styled(Stack)(() => ({
  display: 'inline',
  margin: '0 2px'
}))

export const StyledButton= styled(Button)(() => ({
  fontSize: '10px',
  justifyContent: 'space-between',
  borderRadius: '8px'
}))