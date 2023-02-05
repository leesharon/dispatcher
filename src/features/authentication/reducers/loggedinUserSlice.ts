import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'loggedinUser',
    initialState: {
        loggedinUser: null,
    },
    reducers: {
        login: (state, action) => {
            state.loggedinUser = action.payload.loggedinUser
        },
        logout: state => {
            state.loggedinUser = null
        }
    },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer