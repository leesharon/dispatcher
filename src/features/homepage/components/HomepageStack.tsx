import { StyleSheet } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { Screens } from 'constants'
import { Homepage } from './Homepage'
import { HeadLineDetails } from './HeadLineDetails'
import { Notifications } from './Notifications'

const HomepageStack = (): JSX.Element => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator
            initialRouteName={Screens.HOMEPAGE_STACK.HOMEPAGE}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={Screens.HOMEPAGE_STACK.HOMEPAGE}
                component={Homepage}
            />
            <Stack.Screen
                name={Screens.HOMEPAGE_STACK.HEADLINE_DETAILS}
                component={HeadLineDetails}
            />
            <Stack.Screen
                name={Screens.HOMEPAGE_STACK.NOTFICATIONS}
                component={Notifications}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export { HomepageStack }