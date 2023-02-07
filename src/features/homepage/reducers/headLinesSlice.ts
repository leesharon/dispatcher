import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import headLines from '../../../data/news-us.json'

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

const headLinesSlice = createSlice({
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
        builder.addCase(fetchHeadLines.fulfilled, (state, action) => {
            state.headLines = action.payload
            state.status = Status.succeeded
            state.error = null
        })
        builder.addCase(fetchHeadLines.pending, state => {
            state.status = Status.loading
        })
        builder.addCase(fetchHeadLines.rejected, (state, action) => {
            state.error = action.error.message || null
            state.status = Status.failed
        })
    }
})

const fetchHeadLines = createAsyncThunk('headLines/fetchHeadLines', async () => {
    if (__DEV__)
        return Promise.resolve(JSON.parse(JSON.stringify(headLines)))
    else {
        const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4ec6db6a4d684984be71b32e0ae36b91'
        const res = await axios.get(url)
        return res.data
    }
})

const selectHeadLines = (state: { headLines: headLinesState }) => state.headLines.headLines

const { login, logout } = headLinesSlice.actions

export { selectHeadLines, login, logout, fetchHeadLines, Status }
export default headLinesSlice.reducer