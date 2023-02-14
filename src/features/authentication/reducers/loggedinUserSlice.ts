import { createSlice } from '@reduxjs/toolkit'
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
        login: (state, action) => {
            if (!action.payload.favoriteHeadLines) action.payload.favoriteHeadLineIds = []
            state.loggedinUser = action.payload
        },
        logout: state => {
            state.loggedinUser = null
        },
        addFavoriteHeadline: (state, action) => {
            state.loggedinUser &&
                state.loggedinUser.favoriteHeadLineIds.push(action.payload)
        },
        removeFavoriteHeadline: (state, action) => {
            state.loggedinUser &&
                (state.loggedinUser.favoriteHeadLineIds = state.loggedinUser.favoriteHeadLineIds.filter(
                    headLineId => headLineId !== action.payload
                ))
        }
    },
})

export const selectLoggedinUser = (state: { loggedinUser: LoggedinUserState }) => state.loggedinUser.loggedinUser

export const { login, logout } = userSlice.actions
export default userSlice.reducer