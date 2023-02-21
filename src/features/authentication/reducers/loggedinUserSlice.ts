import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
        updateUser: (state, action: PayloadAction<User>) => {
            state.loggedinUser = action.payload
        },
        updateFavoriteHeadlineIds: (state, action: PayloadAction<string[]>) => {
            state.loggedinUser && (state.loggedinUser.favoriteHeadLineIds =
                [...action.payload, ...state.loggedinUser.favoriteHeadLineIds])
        },
        addFavoriteHeadlineId: (state, action: PayloadAction<{ id: string }>) => {
            state.loggedinUser?.favoriteHeadLineIds.push(action.payload.id)
        },
        removeFavoriteHeadlineId: (state, action: PayloadAction<{ id: string }>) => {
            state.loggedinUser &&
                (state.loggedinUser.favoriteHeadLineIds = state.loggedinUser.favoriteHeadLineIds.filter(
                    headLineId => headLineId !== action.payload.id
                ))
        },
    },
})

export const selectLoggedinUser =
    (state: { loggedinUser: LoggedinUserState }) => state.loggedinUser.loggedinUser

export const { login, logout, addFavoriteHeadlineId, updateFavoriteHeadlineIds, removeFavoriteHeadlineId, updateUser } = userSlice.actions
export default userSlice.reducer