import React, { useEffect, useState, useCallback } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlashMessage from "react-native-flash-message"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'
import { Colors, Constants, Screens } from 'constants/index'
import { login } from 'features/authentication/reducers/loggedinUserSlice'
import { MainTabNavigation } from 'navigation/MainTabNavigation'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { MainStack } from 'constants/screens'

const App = () => {
  const Stack = createStackNavigator()

  const loggedinUser = useAppSelector(state => state.loggedinUser)
  const dispatch = useAppDispatch()

  const [initialRouteName, setIntialRouteName] = useState<MainStack>(Screens.MAIN_STACK.LOGISTER as MainStack)
  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = useCallback((loggedinUser: FirebaseAuthTypes.User | null) => {
    dispatch(login(loggedinUser?.toJSON()))
    if (initializing) setInitializing(false)
  }, [dispatch, initializing])


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  useEffect(() => {
    if (loggedinUser) setIntialRouteName(Screens.MAIN_STACK.MAIN_TAB_NAVIGATION as MainStack)
  })

  return (
    <NavigationContainer>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.BLUE800} />
      </View>
      <SafeAreaProvider style={styles.rootContainer}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name={Screens.MAIN_STACK.LOGISTER}
            component={LogisterScreen}
          />
          <Stack.Screen
            name={Screens.MAIN_STACK.MAIN_TAB_NAVIGATION}
            component={MainTabNavigation}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.BLUE100,
    height: Constants.SCREEN_HEIGHT_WITHOUT_STATUS_BAR,
  },
  statusBar: {
    backgroundColor: Colors.BLUE800,
    height: Constants.STATUS_BAR_HEIGHT,
  },
})

export default App
