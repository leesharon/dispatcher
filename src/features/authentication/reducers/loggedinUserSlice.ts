import { Notification } from 'models/notification';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Strings } from 'constants'
import { User } from 'models/user'

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
            state.loggedinUser?.favoriteHeadLineIds.push(action.payload)
        },
        removeFavoriteHeadline: (state, action: PayloadAction<{ id: string }>) => {
            state.loggedinUser &&
                (state.loggedinUser.favoriteHeadLineIds = state.loggedinUser.favoriteHeadLineIds.filter(
                    headLineId => headLineId !== action.payload.id
                ))
        },
    },
})

export const selectLoggedinUser =
    (state: { loggedinUser: LoggedinUserState }) => state.loggedinUser.loggedinUser

export const { login, logout, addFavoriteHeadline, removeFavoriteHeadline } = userSlice.actions
export default userSlice.reducer