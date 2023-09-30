
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import { navigation } from '../../utils/navigation'

import { StyledDrawerPermanent, StyledDrawerTemporary, StyledListItemButton, StyledNavigation } from './styles'

function Navigation({ handleDrawerToggle, mobileOpen }) {
  /*let selectedPath = ''
  const router = ''

  if (selectedPath.split('/').length > 2) selectedPath = selectedPath.split('/').slice(0, 2).join('/')
  
  const handleNavigateTo = async (path) => {
    router.push(path)
    mobileOpen == true && handleDrawerToggle()
  }*/
  
  const drawer = (
    <List>
      {navigation.map(({ name, Icon, Divider }, index) => (
        <>
          <ListItem key={index} disablePadding>
            <StyledListItemButton
              //onClick={() => handleNavigateTo(path)}
              //selected={path === selectedPath}
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