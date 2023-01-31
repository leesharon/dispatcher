import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native'
import { LearnMoreLinks, Colors } from 'react-native/Libraries/NewAppScreen'
import Header from './src/components/Header'
import { Counter } from './src/features/counter/Counter'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <Counter />
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
})

export default App
