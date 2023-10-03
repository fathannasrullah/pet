import { useLocation, useNavigate } from 'react-router-dom'

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import { navigation } from '../../utils/navigation'

import { StyledDrawerPermanent, StyledDrawerTemporary, StyledListItemButton, StyledNavigation } from './styles'

function Navigation({ handleDrawerToggle, mobileOpen }) {
  const currLocation = useLocation()
  const selectedPath = currLocation.pathname
  const navigate = useNavigate()

  const handleNavigateTo = (path) => {
    navigate(path)
    mobileOpen == true && handleDrawerToggle()
  }
  
  const drawer = (
    <List>
      {navigation.map(({ name, path, Icon, Divider }, index) => (
        <>
          <ListItem key={index} disablePadding>
            <StyledListItemButton
              onClick={() => handleNavigateTo(path)}
              selected={path === selectedPath}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </StyledListItemButton>
          </ListItem>
          {Divider && <Divider />}
        </>
      ))}
    </List>
  )

  return (
    <StyledNavigation>
      <StyledDrawerTemporary
        anchor='left'
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </StyledDrawerTemporary>
      <StyledDrawerPermanent variant='permanent' open>
        {drawer}
      </StyledDrawerPermanent>
    </StyledNavigation>
  )
}

export default Navigation