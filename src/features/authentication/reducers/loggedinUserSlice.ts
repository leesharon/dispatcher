import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice } from '@reduxjs/toolkit'

interface LoggedinUserState {
    loggedinUser: FirebaseAuthTypes.User | null
}

const initialState: LoggedinUserState = {
    loggedinUser: null,
}

const userSlice = createSlice({
    name: 'loggedinUser',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedinUser = action.payload
        },
        logout: state => {
            state.loggedinUser = null
        }
    },
})

export const selectLoggedinUser = (state: { loggedinUser: LoggedinUserState }) => state.loggedinUser.loggedinUser

export const { login, logout } = userSlice.actions
export default userSlice.reducer