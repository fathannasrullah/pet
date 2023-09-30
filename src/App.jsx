import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import AppBar from './components/AppBar/AppBar'

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
