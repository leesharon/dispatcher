import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Image } from 'react-native'
import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'

const App = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <LogisterScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  }
})

export default App
