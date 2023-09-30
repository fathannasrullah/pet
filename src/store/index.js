import { configureStore } from '@reduxjs/toolkit'

import postReducer from './post/slice'
import userReducer from './user/slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  },
  devTools: true,
})

export default store