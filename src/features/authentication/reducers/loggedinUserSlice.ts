import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice } from '@reduxjs/toolkit'

const initialState: { loggedinUser: FirebaseAuthTypes.User | null } = { loggedinUser: null }

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

export const { login, logout } = userSlice.actions
export default userSlice.reducer