import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from './store/message/slice' 
import { STORE_NAME } from './utils/constant'

import AppBar from './components/AppBar/AppBar'
import MessageSnackbar from './components/MessageSnackbar'
import Home from './pages/Home'
import Post from './pages/Post'
import User from './pages/User'

function App() {
  const dispatch = useDispatch()
  const {
    isShowMessage,
    variant,
    primaryText,
    secondaryText,
  } = useSelector((state) => state[STORE_NAME.MESSAGE])

  const handleCloseMessage = () => dispatch(clearMessage())

  return (
    <>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post' element={<Post />} />
        <Route path='/user' element={<User />} />
      </Routes>

      {isShowMessage &&
        <MessageSnackbar 
          openMessage={isShowMessage}
          variant={variant}
          primaryText={primaryText}
          secondaryText={secondaryText}
          handleCloseMessage={handleCloseMessage}
        />
      }
    </>
  )
}

export default App