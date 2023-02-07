import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loggedinUserReducer from 'features/authentication/reducers/loggedinUserSlice'
import headLinesReducer from 'features/homepage/reducers/headLinesSlice'

export const store = configureStore({
  reducer: {
    loggedinUser: loggedinUserReducer,
    headLines: headLinesReducer,
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
