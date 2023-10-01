import { useState } from 'react'

import { Button, Grid, Toolbar, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import Navigation from '../Navigation/Navigation'

import { StyledAppBar, StyledIconButton } from './styles'

const drawerWidth = 240

function AppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
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
      <Navigation
        drawerWidth={drawerWidth} 
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
    </>
  )
}

export default AppBar