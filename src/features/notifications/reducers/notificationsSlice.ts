import { Notification } from 'models/notification'
import { createSlice } from '@reduxjs/toolkit'
import { generateNewNotifcation } from 'utils/notificationsUtils'
import { Strings } from 'constants'

interface notificationsState {
    notifications: Notification[] | []
}

const initialState: notificationsState = {
    notifications: [],
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        markNotificationAsRead: (state, action) => {
            const { notifications } = state

            let updatedNotifications: Notification[]
            const index = notifications.findIndex(notification => notification.id === action.payload)
            if (index === -1) updatedNotifications = notifications
            else updatedNotifications = [
                ...notifications.slice(0, index),
                { ...notifications[index], isUnread: false },
                ...notifications.slice(index + 1)
            ]
            state.notifications = updatedNotifications
        },
        addNotification: (state, action) => {
            state.notifications = [generateNewNotifcation(Strings.NOTIFICATION_MSG, action.payload), ...state.notifications]
        }
    },
})

export const selectNotifications =
    (state: { notifications: notificationsState }) => state.notifications.notifications

export const { markNotificationAsRead, addNotification } = notificationsSlice.actions
export default notificationsSlice.reducer