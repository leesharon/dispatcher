import { ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

const ROOT_STACK = {
    LOGISTER: 'Logister',
    MAIN_TAB: 'MainTab',
}

const MAIN_TAB = {
    HOMEPAGE_STACK: 'HomepageStack',
    PROFILE: 'Profile',
    FAVORITES: 'Favorites',
}

const HOMEPAGE_STACK = {
    HOMEPAGE: 'Homepage',
    HEADLINE_DETAILS: 'HeadlineDetails',
    NOTFICATIONS: 'Notifications',
}

type MainStack = 'Logister' | 'MainTab'
type MainTab = 'Homepage' | 'Profile' | 'Favorites'
interface RootStackParamList {
    Logister: undefined
    MainTab: undefined
}

interface MainTabsParamsList {
    HomepageStack: undefined
    Profile: undefined
    Favorites: undefined
}
interface HomepageStackParamList {
    Homepage: undefined
    HeadlineDetails: { id: string }
    Notifications: undefined
}

export { ROOT_STACK, MAIN_TAB, HOMEPAGE_STACK }
export type { MainStack, MainTab, HomepageStackParamList, MainTabsParamsList, RootStackParamList }
