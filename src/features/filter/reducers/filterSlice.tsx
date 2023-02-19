import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sortBySearchTerm } from 'utils/generalUtils'

interface searchState {
    recentSearches: string[] | []
}

const initialState: searchState = {
    recentSearches: ['crypto', 'soccer', 'chess'],
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // markNotificationAsRead: (state, action: PayloadAction<{ id: string }>) => {
        //     const { notifications } = state

        //     let updatedNotifications: Notification[]
        //     const index = notifications.findIndex(notification => notification.id === action.payload.id)
        //     if (index === -1) updatedNotifications = notifications
        //     else updatedNotifications = [
        //         ...notifications.slice(0, index),
        //         { ...notifications[index], isUnread: false },
        //         ...notifications.slice(index + 1)
        //     ]
        //     state.notifications = updatedNotifications
        // },
        addRecentSearch: (state, action: PayloadAction<string>) => {
            state.recentSearches = [action.payload, ...state.recentSearches]
        },
        removeRecentSearch: (state, action: PayloadAction<string>) => {
            state.recentSearches = state.recentSearches.filter((recent) => recent !== action.payload)
        },
        sortRecentSearches: (state, action: PayloadAction<string>) => {
            state.recentSearches = sortBySearchTerm(state.recentSearches, action.payload)
        },
        clearRecentSearches: (state) => {
            state.recentSearches = []
        }
    },
})

export const selectRecentSearches =
    (state: { search: searchState }) => state.search.recentSearches

export const { addRecentSearch, removeRecentSearch, sortRecentSearches, clearRecentSearches } = searchSlice.actions
export default searchSlice.reducer