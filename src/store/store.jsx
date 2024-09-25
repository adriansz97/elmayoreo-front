import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import appSlice from './app/appSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice
  },
})