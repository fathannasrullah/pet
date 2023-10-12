import { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { motion } from 'framer-motion'
import { currencyFormat } from '../utils/helpers/format-helper'
import { useDispatch } from 'react-redux'
import { updatePostAtHome } from '../store/post/action'

function Likes({ id, likes, submittedData }) {
  const dispatch = useDispatch()
  const [isLikes, setIsLikes] = useState(false)
  const [idSelected, setIdSelected] = useState('')
  const [likesClick, setLikesClick] = useState({ status: '' })

  const handleLikeButton = (event) => {
    const { id } = event.currentTarget

    setLikesClick({ ...likesClick, status: 'clicked' })
    setIdSelected(id)
    setIsLikes(!isLikes)
  }
  
  const calculateLikes = isLikes ? likes+1 : likes
  const likesAmount = currencyFormat(calculateLikes, 0)

  useEffect(() => {
    if (likesClick.status === 'clicked') dispatch(updatePostAtHome({ ...submittedData, likes: calculateLikes }))
  }, [dispatch, likesClick])

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