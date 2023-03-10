import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeFocusedIcon from 'navigation/assets/home-focused.svg'
import HomeIcon from 'navigation/assets/home.svg'
import ProfileIcon from 'navigation/assets/profile.svg'
import ProfileFocusedIcon from 'navigation/assets/profile-focused.svg'
import FavoritesIcon from 'navigation/assets/favorites.svg'
import FavoritesFocusedIcon from 'navigation/assets/favorites-focused.svg'
import { Colors, Constants } from 'constants'
import { ProfileStack } from 'features/profile/components/ProfileStack'
import { HomepageStack } from 'features/homepage/components/HomepageStack'
import { MainTabsParamsList } from 'constants/screens'
import { FavoritesStack } from 'features/favorites/components/FavoritesStack'

const MainTabNavigation = (): JSX.Element => {
    const Tab = createBottomTabNavigator<MainTabsParamsList>()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.mainTabNavigation,
                tabBarShowLabel: false,
                headerShown: false
            }}
            initialRouteName={'HomepageStack'}
        >
            <Tab.Screen
                name={'ProfileStack'}
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? <ProfileFocusedIcon /> : <ProfileIcon />
                    },
                    lazy: true
                }}
            />
            <Tab.Screen
                name={'HomepageStack'}
                component={HomepageStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? <HomeFocusedIcon /> : <HomeIcon />
                    }
                }}
            />
            <Tab.Screen
                name={'FavoritesStack'}
                component={FavoritesStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? <FavoritesFocusedIcon /> : <FavoritesIcon />
                    }
                }}
            />
        </Tab.Navigator >
    )
}

const styles = StyleSheet.create({
    mainTabNavigation: {
        height: 68,
        backgroundColor: Colors.BLUE800,
        paddingBottom: Constants.IS_IOS ? 25 : 18,
        paddingTop: 18,
        borderTopWidth: 0,
    }
})

export { MainTabNavigation }