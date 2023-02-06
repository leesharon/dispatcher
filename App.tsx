import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlashMessage from "react-native-flash-message"
import { useDispatch, useSelector } from 'react-redux'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'
import { HomePageScreen } from './src/features/homepage/components/HomePageScreen'
import { Colors, Constants } from 'constants/index'
import { RootState } from 'state/store'
import { login } from 'features/authentication/reducers/loggedinUserSlice'

const App = () => {
  const loggedinUser = useSelector(({ loggedinUser }: RootState) => loggedinUser)
  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = useCallback((loggedinUser: FirebaseAuthTypes.User | null) => {
    dispatch(login(loggedinUser))
    if (initializing) setInitializing(false)
  }, [dispatch, initializing])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return (
    <ScrollView style={styles.rootContainer}>
      <KeyboardAvoidingView behavior="position" >
        <SafeAreaProvider style={styles.rootContainer}>
          {/* <LogisterScreen /> */}
          <HomePageScreen loggedinUser={loggedinUser} />
          <FlashMessage position="top" />
        </SafeAreaProvider>
      </KeyboardAvoidingView>
    </ScrollView>
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
