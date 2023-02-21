
type RootStack = 'Logister' | 'MainTabNavigation' | 'Onboarding' | null

type RootStackParamList = {
    Logister: undefined
    MainTabNavigation: undefined
    Onboarding: undefined
}

type MainTabsParamsList = {
    HomepageStack: undefined
    ProfileStack: undefined
    FavoritesStack: undefined
}

type HomepageStackParamList = {
    Homepage: { searchValue: string } | undefined
    HeadlineDetails: { id: string }
    Notifications: undefined
    Search: undefined
}

type FavoritesStackParamList = {
    Favorites: undefined
    HeadlineDetails: { id: string }
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
    ProfileStackParamList,
    FavoritesStackParamList
}
