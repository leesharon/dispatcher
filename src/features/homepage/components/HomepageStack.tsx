import { createStackNavigator } from '@react-navigation/stack'
import { Homepage } from './Homepage'
import { HeadLineDetails } from './HeadLineDetails'
import { Notifications } from '../../notifications/components/Notifications'
import { HomepageStackParamList } from 'constants/screens'
import { Search } from 'features/search/components/Search'
import { useEffect } from 'react'
import { asyncStorageUtils } from 'utils/asyncStorageUtils'
import { updateFavoriteHeadlineIds } from 'features/authentication/reducers/loggedinUserSlice'
import { useAppDispatch } from 'state/hooks'
import { HeadLine } from 'models/headline'
import { updateFavoritesFromStorage } from 'features/favorites/reducers/favoritesSlice'

const HomepageStack = (): JSX.Element => {
    const Stack = createStackNavigator<HomepageStackParamList>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            const headLines = await asyncStorageUtils.getFavoriteHeadLines()
            if (headLines) {
                // setFavoriteHeadLines(headLines)
                dispatch(updateFavoriteHeadlineIds(headLines.map((headLine: HeadLine) => headLine.id)))
                dispatch(updateFavoritesFromStorage(headLines))
            }
        })()
    }, [dispatch])

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

export { HomepageStack }