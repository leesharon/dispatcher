import { useEffect, useState, useCallback } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import FlashMessage from 'react-native-flash-message'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { LogisterScreen } from './src/features/authentication/components/LogisterScreen'
import { Colors, Constants } from 'constants/index'
import { login } from 'features/authentication/reducers/loggedinUserSlice'
import { MainTabNavigation } from 'navigation/MainTabNavigation'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { RootStack } from 'constants/screens'
import { navigationRef } from 'navigation/RootNavigation'
import { RootStackParamList } from 'constants/screens'
import { User } from 'models/user'
import { OnboardingScreen } from 'features/onboarding/components/OnboardingScreen'
import { asyncStorageUtils } from 'utils/asyncStorageUtils'

const App = () => {
    const Stack = createStackNavigator<RootStackParamList>()

    const loggedinUser = useAppSelector(state => state.loggedinUser)
    const dispatch = useAppDispatch()

    const [initialRouteName, setIntialRouteName] = useState<RootStack>(null)
    const [initializing, setInitializing] = useState(true)

    const onAuthStateChanged = useCallback((loggedinUser: FirebaseAuthTypes.User | null) => {
        loggedinUser && dispatch(login(loggedinUser.toJSON() as User))
        if (initializing) setInitializing(false)
    }, [dispatch, initializing])

    // handles authentication changes
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [onAuthStateChanged])

    // handles user initial screen
    useEffect(() => {
        (async () => {
            try {
                const isBoarded = await asyncStorageUtils.isBoarding()
                // split
                if (!isBoarded) {
                    setIntialRouteName('Onboarding')
                }
                else if (loggedinUser.loggedinUser) {
                    // const user = await auth().currentUser
                    setIntialRouteName('MainTab')
                }
                else if (loggedinUser.loggedinUser === null) setIntialRouteName('Logister')

            } catch (err) {
                console.log(err, 'Cannot get is boarding')
            }
        })()
    }, [loggedinUser])

    //hides the splash screen on app load
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <NavigationContainer ref={navigationRef}>
            <View style={styles.statusBar}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.BLUE800} />
            </View>
            <SafeAreaProvider style={styles.rootContainer}>
                {initialRouteName &&
                    <Stack.Navigator
                        initialRouteName={initialRouteName}
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen
                            name={'Logister'}
                            component={LogisterScreen}
                        />
                        <Stack.Screen
                            name={'MainTab'}
                            component={MainTabNavigation}
                        />
                        <Stack.Screen
                            name={'Onboarding'}
                            component={OnboardingScreen}
                        />
                    </Stack.Navigator>}
            </SafeAreaProvider>
            <FlashMessage position="top" />
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
