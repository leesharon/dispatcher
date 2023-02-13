import { ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

const MAIN_STACK = {
    LOGISTER: 'Logister',
    MAIN_TAB_NAVIGATION: 'MainTabNavigation',
}

const MAIN_TAB_NAVIGATION = {
    HOMEPAGE_STACK_NAVIGATION: 'HomepageStackNavigation',
    PROFILE: 'Profile',
    FAVORITES: 'Favorites',
}

const HOMEPAGE_STACK_NAVIGATION = {
    HOMEPAGE: 'Homepage',
    HEADLINE_DETAILS: 'HeadlineDetails',
}

export type MainStack = 'Logister' | 'MainTabNavigation'
export type MainTabNavigation = 'Homepage' | 'Profile' | 'Favorites'
export interface HomepageStackNavigation {
    Homepage: undefined
    HeadlineDetails: { id: string }
}
export type Navigation = StackNavigationProp<ParamListBase>

export { MAIN_STACK, MAIN_TAB_NAVIGATION, HOMEPAGE_STACK_NAVIGATION }
