import { OutlinedInput, styled } from '@mui/material'

export const StyledForm = styled('form')(() => ({
  display: 'flex',
  justifyContent: 'center'
}))

export const StyledSearchContainer = styled('div')(({ theme }) => ({
  zIndex: 1100,
  position: 'fixed',
  top: '12px',
  [theme.breakpoints.up(1023)]: {
    width: '50%'
  },
  [theme.breakpoints.down(1023)]: {
    width: '100',
    left: '50px',
    right: '15px',
  }
}))

export const StyledSearchIconContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: '30px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  '& .MuiInputAdornment-positionEnd': {
    margin: '0 -10px'
  }
}))