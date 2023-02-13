import { View, StyleSheet } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppText } from 'components/common/AppText'
import { HomepageTab } from 'features/homepage/components/HomepageTab'
import HomeFocusedIcon from 'navigation/assets/home-focused.svg'
import HomeIcon from 'navigation/assets/home.svg'
import ProfileIcon from 'navigation/assets/profile.svg'
import ProfileFocusedIcon from 'navigation/assets/profile-focused.svg'
import FavoritesIcon from 'navigation/assets/favorites.svg'
import FavoritesFocusedIcon from 'navigation/assets/favorites-focused.svg'
import { Colors, Screens } from 'constants'


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
            initialRouteName={Screens.MAIN_TAB_NAVIGATION.HOMEPAGE}
        >
            <Tab.Screen
                name={Screens.MAIN_TAB_NAVIGATION.PROFILE}
                component={() => <AppText>This is your Profile</AppText>}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? <ProfileFocusedIcon /> : <ProfileIcon />
                    }
                }}
            />
            <Tab.Screen
                name={Screens.MAIN_TAB_NAVIGATION.HOMEPAGE}
                component={HomepageTab}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? <HomeFocusedIcon /> : <HomeIcon />
                    }
                }}
            />
            <Tab.Screen
                name={Screens.MAIN_TAB_NAVIGATION.FAVORITES}
                component={() => <AppText>This is your Favorites</AppText>}
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