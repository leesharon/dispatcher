import 'react-native-gesture-handler'
if (__DEV__) {
  import('./reactotron').then(() => console.log('Reactotron Configured'))
}

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { store } from './src/state/store'
import { Provider } from 'react-redux'
import React from 'react'

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
))
