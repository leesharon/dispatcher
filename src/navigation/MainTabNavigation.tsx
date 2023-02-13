import { View, StyleSheet } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppText } from 'components/common/AppText'
import { HomepageTab } from 'features/homepage/components/HomepageTab'
import HomeFocusedIcon from 'navigation/assets/home-focused.svg'


interface MainTabNavigationProps {
}

const MainTabNavigation = ({ }: MainTabNavigationProps): JSX.Element => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
        >
            <Tab.Screen
                name="Homepage"
                component={HomepageTab}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator >
    )
}

const styles = StyleSheet.create({
    mainTabNavigation: {
        backgroundColor: 'red',
    }
})

export { MainTabNavigation }