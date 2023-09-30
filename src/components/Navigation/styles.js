import { Drawer, ListItemButton, SwipeableDrawer, styled } from '@mui/material'

export const StyledNavigation = styled('nav')(({ theme }) => ({
  flexShrink: 0,
  [theme.breakpoints.up(1023)]: {
    width: '240px'
  }
}))

export const StyledDrawerTemporary = styled(SwipeableDrawer)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down(1023)]: {
    display: 'block'
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '240px',
    borderRadius: '0 20px 20px 0'
  }
}))

export const StyledDrawerPermanent = styled(Drawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.down(1023)]: {
    display: 'none'
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '240px'
  }
}))

export const StyledListItemButton = styled(ListItemButton)(() => ({
  width: '240px',
  borderRadius: '0 30px 30px 0'
}))