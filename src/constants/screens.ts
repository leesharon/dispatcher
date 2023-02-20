
type RootStack = 'Logister' | 'MainTab' | 'Carousel'

type RootStackParamList = {
    Logister: undefined
    MainTab: undefined
    Carousel: undefined
}

type MainTabsParamsList = {
    HomepageStack: undefined
    ProfileStack: undefined
    Favorites: undefined
}

type HomepageStackParamList = {
    Homepage: { searchValue: string } | undefined
    HeadlineDetails: { id: string }
    Notifications: undefined
    Search: undefined
}

type ProfileStackParamList = {
    Profile: undefined
    Terms: undefined
    ProfileEdit: undefined
    Settings: undefined
}

export type {
    RootStack,
    HomepageStackParamList,
    MainTabsParamsList,
    RootStackParamList,
    ProfileStackParamList
}
