const MAIN_STACK = {
    LOGISTER: 'Logister',
    MAIN_TAB_NAVIGATION: 'MainTabNavigation',
}

const MAIN_TAB_NAVIGATION = {
    HOMEPAGE: 'Homepage',
    PROFILE: 'Profile',
    FAVORITES: 'Favorites',
}

export type MainStack = 'Logister' | 'MainTabNavigation'
export type MainTabNavigation = 'Homepage' | 'Profile' | 'Favorites'

export { MAIN_STACK, MAIN_TAB_NAVIGATION }
