import { createStackNavigator } from '@react-navigation/stack'
import { FavoritesStackParamList } from 'constants/screens'
import { HeadLineDetails } from 'features/homepage/components/HeadLineDetails'
import { Favorites } from './Favorites'

const FavoritesStack = (): JSX.Element => {
    const Stack = createStackNavigator<FavoritesStackParamList>()

    return (
        <Stack.Navigator
            initialRouteName={'Favorites'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={'Favorites'}
                component={Favorites}
            />
            <Stack.Screen
                name={'HeadlineDetails'}
                component={HeadLineDetails}
            />
        </Stack.Navigator>
    )
}

export { FavoritesStack }