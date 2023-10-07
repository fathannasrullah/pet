import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage } from './store/message/slice' 
import { STORE_NAME } from './utils/constant'
import AppBar from './components/AppBar/AppBar'
import MessageSnackbar from './components/MessageSnackbar'
import InitialLoading from './components/IntialLoading'

const Home = lazy(() => import('./pages/Home'))
const User = lazy(() => import('./pages/User'))
const Post = lazy(() => import('./pages/Post'))

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
      <Suspense fallback={<InitialLoading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/post' element={<Post />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </Suspense>

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