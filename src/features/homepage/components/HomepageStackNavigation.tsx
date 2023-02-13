import { StyleSheet } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { Screens } from 'constants'
import { Homepage } from './Homepage'
import { HeadLineDetails } from './HeadLineDetails'

interface HomepageStackNavigationProps {
}

const HomepageStackNavigation = ({ }: HomepageStackNavigationProps): JSX.Element => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName={Screens.HOMEPAGE_STACK_NAVIGATION.HOMEPAGE}>
            <Stack.Screen
                name={Screens.HOMEPAGE_STACK_NAVIGATION.HOMEPAGE}
                component={Homepage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Screens.HOMEPAGE_STACK_NAVIGATION.HEADLINE_DETAILS}
                component={HeadLineDetails}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export { HomepageStackNavigation }