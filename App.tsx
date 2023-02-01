import React, { Fragment } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Image } from 'react-native'
import { Colors } from './src/constants/colors'
import { AppInput, ContentType } from './src/components/common/AppInput'
import LogisterButton from './src/components/common/LogisterButton'
import { validateEmail, validatePassword } from './src/utils/functions'

const App = () => {
  const [value, setValue] = React.useState('')
  const [value2, setValue2] = React.useState('')
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.test}>
            <AppInput
              placeholderText='this is a passowrd'
              contentType={ContentType.password}
              value={value}
              setValue={setValue}
              validate={validatePassword}
            />
            <AppInput
              placeholderText='this is an email'
              contentType={ContentType.email}
              value={value2}
              setValue={setValue2}
              validate={validateEmail}
            />
            <LogisterButton bgColor={Colors.blue500} onPress={() => { console.log('I was pressed') }}>Test!</LogisterButton>
            <LogisterButton bgColor={Colors.blue300} onPress={() => { console.log('I was pressed') }}>Test!</LogisterButton>
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
    justifyContent: 'space-between',
    flex: 1
  }
})

export default App
