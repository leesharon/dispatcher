import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeFocusedIcon from 'navigation/assets/home-focused.svg'
import HomeIcon from 'navigation/assets/home.svg'
import ProfileIcon from 'navigation/assets/profile.svg'
import ProfileFocusedIcon from 'navigation/assets/profile-focused.svg'
import FavoritesIcon from 'navigation/assets/favorites.svg'
import FavoritesFocusedIcon from 'navigation/assets/favorites-focused.svg'
import { Colors, Screens } from 'constants'
import { ProfileTab } from 'features/profile/components/ProfileTab'
import { FavortiesTab } from 'features/favorites/components/FavoritesTab'
import { HomepageStack } from 'features/homepage/components/HomepageStack'

interface MainTabNavigationProps {
}

const MainTabNavigation = ({ }: MainTabNavigationProps): JSX.Element => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.mainTabNavigation,
                tabBarShowLabel: false,
                headerShown: false
            }}
            initialRouteName={Screens.MAIN_TAB.HOMEPAGE_STACK}
        >
            <Tab.Screen
                name={Screens.MAIN_TAB.PROFILE}
                component={ProfileTab}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? <ProfileFocusedIcon /> : <ProfileIcon />
                    }
                }}
            />
            <Tab.Screen
                name={Screens.MAIN_TAB.HOMEPAGE_STACK}
                component={HomepageStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? <HomeFocusedIcon /> : <HomeIcon />
                    }
                }}
            />
            <Tab.Screen
                name={Screens.MAIN_TAB.FAVORITES}
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