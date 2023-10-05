import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import AppBar from './components/AppBar/AppBar'
import Post from './pages/Post'
import User from './pages/User'

import { useSelector } from 'react-redux'
import { STORE_NAME } from './utils/constant'

function App() {
  const { isShowMessage } = useSelector((state) => state[STORE_NAME.MESSAGE])
  console.log('message :', isShowMessage)
  return (
    <>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post' element={<Post />} />
        <Route path='/user' element={<User />} />
      </Routes>


    </>
  )
}

export default App