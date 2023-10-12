import { useState } from 'react'
import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { motion } from 'framer-motion'
import { currencyFormat } from '../utils/helpers/format-helper'

function Likes({ id, likes }) {
  const [isLikes, setIsLikes] = useState(false)
  const [idSelected, setIdSelected] = useState('')

  const handleLikeButton = (event) => {
    const { id } = event.currentTarget

    setIdSelected(id)
    setIsLikes(!isLikes)
  }
  
  const calculateLikes = isLikes ? likes+1 : likes
  const likesAmount = currencyFormat(calculateLikes, 0)

  return (
    <>
      <IconButton aria-label='likes'
        id={id}
        value={likes}
        sx={{ color: (isLikes && id === idSelected) && 'red' }}
        onClick={handleLikeButton}
        component={motion.button}
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.5 }}
      >
        <FavoriteIcon/>
      </IconButton>
      <span>{likesAmount}</span>
    </>
  )
}

export default Likes