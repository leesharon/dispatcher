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

type RootStackParamList = {
    Logister: undefined
    MainTab: undefined
}

type MainTabsParamsList = {
    HomepageStack: undefined
    Profile: undefined
    Favorites: undefined
}
type HomepageStackParamList = {
    Homepage: undefined
    HeadlineDetails: { id: string }
    Notifications: undefined
}

export { ROOT_STACK, MAIN_TAB, HOMEPAGE_STACK }
export type { MainStack, HomepageStackParamList, MainTabsParamsList, RootStackParamList }
