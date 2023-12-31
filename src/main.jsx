import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './assets/theme'
import store from './store/index'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={import.meta.env.DEV ? '/' : '/pet'}>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  </Provider>
)
