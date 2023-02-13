import React, { useEffect, useState, useCallback } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlashMessage from "react-native-flash-message"
import { useDispatch, useSelector } from 'react-redux'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'
import { HomePageScreen } from './src/features/homepage/components/HomePageScreen'
import { Colors, Constants } from 'constants/index'
import { login, selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'
import { firebaseLogin } from 'utils/firebaseAuthUtils'

enum InitialRoute {
  LOGISTER = 'Logister',
  HOMEPAGE = 'Homepage'
}

const App = () => {
  const Stack = createStackNavigator()

  const loggedinUser = useSelector(selectLoggedinUser)
  const dispatch = useDispatch()

  const [initialRouteName, setIntialRouteName] = useState<InitialRoute>(InitialRoute.LOGISTER)
  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = useCallback((loggedinUser: FirebaseAuthTypes.User | null) => {
    dispatch(login(loggedinUser?.toJSON()))
    if (initializing) setInitializing(false)
  }, [dispatch, initializing])


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  useEffect(() => {
    if (loggedinUser) setIntialRouteName(InitialRoute.HOMEPAGE)
  })

  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.rootContainer}>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen name={InitialRoute.LOGISTER} component={LogisterScreen} />
          <Stack.Screen name={InitialRoute.HOMEPAGE} component={HomePageScreen} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.BLUE100,
    height: Constants.SCREEN_HEIGHT_WITHOUT_STATUS_BAR,
  },
  statusBar: {
    backgroundColor: Colors.BLUE800,
  },
})

export default App
