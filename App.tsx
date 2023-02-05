import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, } from 'react-native'
import auth from '@react-native-firebase/auth'

import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'
import { Colors } from 'constants/colors'
import { SCREEN_HEIGHT } from 'constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'state/store'
import { login } from 'features/authentication/reducers/loggedinUserSlice'
import { useCallback } from 'react'

const App = () => {
  const user = useSelector(({ loggedinUser }: RootState) => loggedinUser)
  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = useCallback((user: any) => {
    user = user.toJSON()
    dispatch(login(user))
    if (initializing) setInitializing(false)
  }, [dispatch, initializing])

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
