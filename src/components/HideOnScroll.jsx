import { Slide, useScrollTrigger } from '@mui/material'

const HideOnScroll = (props) => {
  const { window, children } = props
  
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll