import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlashMessage from "react-native-flash-message"
import { useDispatch, useSelector } from 'react-redux'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'
import { HomePageScreen } from './src/features/homepage/components/HomePageScreen'
import { Colors, Constants } from 'constants/index'
import { login, selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'
import { firebaseLogin } from 'utils/firebaseAuthUtils'

const App = () => {
  const loggedinUser = useSelector(selectLoggedinUser)
  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = useCallback((loggedinUser: FirebaseAuthTypes.User | null | any) => {
    dispatch(login(loggedinUser?.toJSON()))
    if (initializing) setInitializing(false)
  }, [dispatch, initializing])

  // firebaseLogin('lee@lee.com', 'Lol123456789')

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return (
    <SafeAreaProvider style={styles.rootContainer}>
      <LogisterScreen />
      {/* {loggedinUser && <HomePageScreen loggedinUser={loggedinUser} />} */}
      <FlashMessage position="top" />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.BLUE100,
    height: Constants.SCREEN_HEIGHT_WITHOUT_STATUS_BAR,
  }
})

export default App
