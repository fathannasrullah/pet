import { Divider } from '@mui/material'

import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

export const navigation  = [
  {
    name: 'Home',
    Icon: HomeOutlinedIcon,
    path: '/',
    Divider: Divider
  },
  {
    name: 'User',
    Icon: ListAltOutlinedIcon,
    path: '/user'
  },
  {
    name: 'Post',
    Icon: ShoppingCartOutlinedIcon,
    path: '/post',
    Divider: Divider
  }
]