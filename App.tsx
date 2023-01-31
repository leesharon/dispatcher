import React, { Fragment } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Image } from 'react-native'
import { Colors } from './assets/colors'
import { AppInput, ContentType } from './src/components/common/AppInput'
import LogisterButton from './src/components/common/LogisterButton'

const App = () => {
  const [value, setValue] = React.useState('')
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.test}>
            <AppInput
              placeholderText='this is a test'
              contentType={ContentType.password}
              value={value}
              setValue={setValue}
            />
            <AppInput
              placeholderText='this is a test'
              contentType={ContentType.email}
              value={value}
              setValue={setValue}
            />
            <LogisterButton bgColor={Colors.blue500} onPress={() => { console.log('I was pressed') }}>Test!</LogisterButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    width: '90%',
  },
  body: {
  },
  test: {
    width: '90%',
  }
})

export default App
