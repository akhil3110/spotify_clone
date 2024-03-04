import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './slice/TokenSlice'
import songReducer from './slice/SongsSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    songs: songReducer,
  },
})

