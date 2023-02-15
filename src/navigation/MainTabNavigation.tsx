import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeFocusedIcon from 'navigation/assets/home-focused.svg'
import HomeIcon from 'navigation/assets/home.svg'
import ProfileIcon from 'navigation/assets/profile.svg'
import ProfileFocusedIcon from 'navigation/assets/profile-focused.svg'
import FavoritesIcon from 'navigation/assets/favorites.svg'
import FavoritesFocusedIcon from 'navigation/assets/favorites-focused.svg'
import { Colors } from 'constants'
import { ProfileTab } from 'features/profile/components/ProfileTab'
import { FavortiesTab } from 'features/favorites/components/FavoritesTab'
import { HomepageStack } from 'features/homepage/components/HomepageStack'
import { MainTabsParamsList } from 'constants/screens'

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
                name={'Profile'}
                component={ProfileTab}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? <ProfileFocusedIcon /> : <ProfileIcon />
                    }
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
                name={'Favorites'}
                component={FavortiesTab}
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
        paddingBottom: 18,
        paddingTop: 18,
    }
})

export { MainTabNavigation }