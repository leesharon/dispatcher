import { Colors } from 'constants/colors'
import { SCREEN_HEIGHT } from 'constants/constants'
import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, View, } from 'react-native'
import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'

const App = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView behavior="position">
        <SafeAreaView style={styles.rootContainer}>
          <LogisterScreen />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView >
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
