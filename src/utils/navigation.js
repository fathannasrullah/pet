import { Divider } from '@mui/material'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded'

export const navigation  = [
  {
    name: 'Home',
    Icon: HomeOutlinedIcon,
    path: '/',
    Divider: Divider
  },
  {
    name: 'User',
    Icon: AccountCircleRoundedIcon,
    path: '/user'
  },
  {
    name: 'Post',
    Icon: PhotoLibraryRoundedIcon,
    path: '/post',
    Divider: Divider
  }
]