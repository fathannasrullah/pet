import { useState } from 'react'
import { Button, Grid, Toolbar, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Navigation from '../Navigation/Navigation'
import HideOnScroll from '../HideOnScroll'
import { StyledAppBar, StyledIconButton } from './styles'

const drawerWidth = 240

function AppBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  return (
    <>
      <HideOnScroll {...props}>
        <StyledAppBar>
          <Toolbar>
            <StyledIconButton
              aria-label='open navigation'
              edge='start'
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </StyledIconButton>
          
            <Grid container justifyContent='center'><Button></Button></Grid>
          </Toolbar>
        </StyledAppBar>
      </HideOnScroll>
      <Navigation
        drawerWidth={drawerWidth} 
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
    </>
  )
}

export default AppBar