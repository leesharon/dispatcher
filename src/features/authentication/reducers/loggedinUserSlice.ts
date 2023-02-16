import { Notification } from 'models/notification';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Strings } from 'constants'
import { User } from 'models/user'
import { generateNewNotifcation } from 'utils/notificationsUtils'

interface LoggedinUserState {
    loggedinUser: User | null
}

const initialState: LoggedinUserState = {
    loggedinUser: null,
}

const userSlice = createSlice({
    name: 'loggedinUser',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            if (!action.payload.favoriteHeadLineIds) action.payload.favoriteHeadLineIds = []
            if (!action.payload.notifications) action.payload.notifications = []
            state.loggedinUser = action.payload
        },
        logout: state => {
            state.loggedinUser = null
        },
        addFavoriteHeadline: (state, action: PayloadAction<{ id: string }>) => {
            state.loggedinUser?.favoriteHeadLineIds.push(action.payload.id)
            state.loggedinUser?.notifications
                .push(generateNewNotifcation(Strings.NOTIFICATION_MSG, action.payload.id))
        },
        removeFavoriteHeadline: (state, action: PayloadAction<{ id: string }>) => {
            state.loggedinUser &&
                (state.loggedinUser.favoriteHeadLineIds = state.loggedinUser.favoriteHeadLineIds.filter(
                    headLineId => headLineId !== action.payload.id
                ))
        },
        markNotificationAsRead: (state, action: PayloadAction<{ id: string }>) => {
            if (!state.loggedinUser) return
            const { notifications } = state.loggedinUser

            let updatedNotifications: Notification[]
            const index = notifications.findIndex(notification => notification.id === action.payload.id);
            if (index === -1) updatedNotifications = notifications
            else updatedNotifications = [
                ...notifications.slice(0, index),
                { ...notifications[index], isUnread: false },
                ...notifications.slice(index + 1)
            ]
            state.loggedinUser.notifications = updatedNotifications
        }
    },
})

export const selectLoggedinUser =
    (state: { loggedinUser: LoggedinUserState }) => state.loggedinUser.loggedinUser

export const { login, logout } = userSlice.actions
export default userSlice.reducer