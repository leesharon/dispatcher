import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
// import { reactotron } from '../../reactotron'

// const middlewares = []

// if (__DEV__) {
//   const reactotronMiddleware = reactotron.createEnhancer()
//   middlewares.push(reactotronMiddleware)
// }

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  // middleware: middlewares,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
