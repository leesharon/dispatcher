
type RootStack = 'Logister' | 'MainTab'

type RootStackParamList = {
    Logister: undefined
    MainTab: undefined
}

type MainTabsParamsList = {
    HomepageStack: undefined
    ProfileStack: undefined
    Favorites: undefined
}

type HomepageStackParamList = {
    Homepage: undefined
    HeadlineDetails: { id: string }
    Notifications: undefined
}

type ProfileStackParamList = {
    Profile: undefined
    Terms: undefined
}

export type {
    RootStack,
    HomepageStackParamList,
    MainTabsParamsList,
    RootStackParamList,
    ProfileStackParamList
}
