import { configureStore } from '@reduxjs/toolkit'
import pastReducer from './redux/pastfile'
export default configureStore({
  reducer: {
    pastes: pastReducer,
  },
})