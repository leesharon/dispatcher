import { StyleSheet } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileStackParamList } from 'constants/screens'
import { Profile } from './Profile'

const ProfileStack = (): JSX.Element => {
    const Stack = createStackNavigator<ProfileStackParamList>()

    return (
        <Stack.Navigator
            initialRouteName={'Profile'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={'Profile'}
                component={Profile}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export { ProfileStack }