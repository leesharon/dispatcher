import { StyleSheet } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { Homepage } from './Homepage'
import { HeadLineDetails } from './HeadLineDetails'
import { Notifications } from '../../notifications/components/Notifications'
import { HomepageStackParamList } from 'constants/screens'
import { Search } from 'features/search/components/Search'

const HomepageStack = (): JSX.Element => {
    const Stack = createStackNavigator<HomepageStackParamList>()

    return (
        <Stack.Navigator
            initialRouteName={'Homepage'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={'Homepage'}
                component={Homepage}
            />
            <Stack.Screen
                name={'HeadlineDetails'}
                component={HeadLineDetails}
            />
            <Stack.Screen
                name={'Notifications'}
                component={Notifications}
            />
            <Stack.Screen
                name={'Search'}
                component={Search}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export { HomepageStack }