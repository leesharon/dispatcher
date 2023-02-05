import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, } from 'react-native'
import auth from '@react-native-firebase/auth'

import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'
import { Colors } from 'constants/colors'
import { SCREEN_HEIGHT } from 'constants/constants'

const App = () => {

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  const onAuthStateChanged = (user: any) => {
    setUser(user)
    console.log('user: ', user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView behavior="position">
        <SafeAreaView style={styles.rootContainer}>
          <LogisterScreen />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.BLUE100,
    height: SCREEN_HEIGHT,
  }
})

export default App
