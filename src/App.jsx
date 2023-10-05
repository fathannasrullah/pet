import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { STORE_NAME } from './utils/constant'

import AppBar from './components/AppBar/AppBar'
import MessageSnackbar from './components/MessageSnackbar'
import Home from './pages/Home'
import Post from './pages/Post'
import User from './pages/User'


function App() {
  const {
    isShowMessage,
    primaryText,
    secondaryText
  } = useSelector((state) => state[STORE_NAME.MESSAGE])
  
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
          primaryText={primaryText}
          secondaryText={secondaryText}
        />
      }
    </>
  )
}

export default App