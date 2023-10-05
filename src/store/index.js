import { configureStore } from '@reduxjs/toolkit'

import messageReducer from './message/slice'
import postReducer from './post/slice'
import userReducer from './user/slice'

const store = configureStore({
  reducer: {
    message: messageReducer,
    user: userReducer,
    post: postReducer
  },
  devTools: true,
})

export default store