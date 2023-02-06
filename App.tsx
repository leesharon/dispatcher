import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, } from 'react-native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'
import { Colors } from 'constants/colors'
import { SCREEN_HEIGHT_WITHOUT_STATUS_BAR } from 'constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'state/store'
import { login } from 'features/authentication/reducers/loggedinUserSlice'
import { useCallback } from 'react'
import FlashMessage from "react-native-flash-message"

const App = () => {
  const user = useSelector(({ loggedinUser }: RootState) => loggedinUser)
  console.log('App ~ user', user)
  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = useCallback((user: FirebaseAuthTypes.User | null) => {
    let loggedinUser
    if (user) loggedinUser = {
      email: user.email,
      uid: user.uid,
    }

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
        <SafeAreaView style={styles.rootContainer}>
          <LogisterScreen />
          <FlashMessage position="top" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.BLUE100,
    height: SCREEN_HEIGHT_WITHOUT_STATUS_BAR,
  }
})

export default App
