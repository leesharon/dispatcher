import React, { Fragment } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Image } from 'react-native'
import { Colors } from './src/constants/colors'
import { AppInput, ContentType } from './src/components/common/AppInput'
import LogisterButton from './src/components/common/LogisterButton'
import { validateEmail, validatePassword } from './src/utils/validationUtils'
import ArrowRight from './assets/arrow-right.svg'
import { emailPlaceholder, passwordPlaceholder } from './src/constants/strings'
import auth from '@react-native-firebase/auth';

const App = () => {
  const [value, setValue] = React.useState('')
  const [value2, setValue2] = React.useState('')

  auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }

      console.error(error);
    })

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.test}>
          <AppInput
            placeholderText={passwordPlaceholder}
            contentType={ContentType.password}
            value={value}
            setValue={setValue}
            validate={validatePassword}
          />
          <AppInput
            placeholderText={emailPlaceholder}
            contentType={ContentType.email}
            value={value2}
            setValue={setValue2}
            validate={validateEmail}
          />
          <LogisterButton
            onPress={() => { console.log('I was pressed') }}
            textStyle={styles.login}
            bgColor={Colors.BLUE500}>
            Test!
          </LogisterButton>
          <LogisterButton
            onPress={() => { console.log('I was pressed') }}
            textStyle={styles.signup}
            icon={<ArrowRight />}
            bgColor={Colors.BLUE300}
          >
            Test!
          </LogisterButton>
          <LogisterButton
            onPress={() => { console.log('I was pressed') }}
            textStyle={styles.secondary}
            bgColor={Colors.GRAY500}
          >
            Test!
          </LogisterButton>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  login: {
    backgroundColor: Colors.BLUE500,
    color: 'white',
    fontWeight: '500',
  },
  signup: {
    backgroundColor: Colors.BLUE300,
    color: 'white',
    fontWeight: '400',
  },
  secondary: {
    backgroundColor: Colors.GRAY500,
    color: 'black',
    fontWeight: '400',
  }
})

export default App
