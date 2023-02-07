import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface headLinesState {
    headLines: [] | null
    status: Status
    error: string | null
}

enum Status {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed'
}

const initialState: headLinesState = {
    headLines: null,
    status: Status.idle,
    error: null
}

const userSlice = createSlice({
    name: 'headLines',
    initialState,
    reducers: {
        login: (state, action) => {
            state.headLines = action.payload
        },
        logout: state => {
            state.headLines = null
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.headLines = action.payload
            state.status = Status.succeeded
            state.error = null
        })
        builder.addCase(fetchPosts.pending, state => {
            state.status = Status.loading
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.error = action.error.message || null
            state.status = Status.failed
        })
    }
})

export const fetchPosts = createAsyncThunk('headLines/fetchHeadLines', async () => {
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4ec6db6a4d684984be71b32e0ae36b91'
    const res = await axios.get(url)
    console.log('res.data: ', res.data)
    return res.data
})

const selectHeadLines = (state: { headLines: headLinesState }) => state.headLines.headLines

const { login, logout } = userSlice.actions

export { selectHeadLines, login, logout }
export default userSlice.reducer