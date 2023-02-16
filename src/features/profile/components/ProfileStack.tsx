import { StyleSheet } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileStackParamList } from 'constants/screens'
import { Profile } from './Profile'
import { Terms } from './Terms'
import { ProfileEdit } from './ProfileEdit'

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
            <Stack.Screen
                name={'Terms'}
                component={Terms}
            />
            <Stack.Screen
                name={'ProfileEdit'}
                component={ProfileEdit}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export { ProfileStack }