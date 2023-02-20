import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loggedinUserReducer from 'features/authentication/reducers/loggedinUserSlice'
import notificationsReducer from 'features/notifications/reducers/notificationsSlice'
import searchReducer from 'features/search/reducers/searchSlice'
import filterReducer from 'features/filter/reducers/filterSlice'
import { apiSlice } from '../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    loggedinUser: loggedinUserReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    search: searchReducer,
    filter: filterReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
