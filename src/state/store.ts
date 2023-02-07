import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loggedinUserReducer from 'features/authentication/reducers/loggedinUserSlice'

export const store = configureStore({
  reducer: {
    loggedinUser: loggedinUserReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
