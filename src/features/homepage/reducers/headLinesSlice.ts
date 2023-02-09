import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HeadLine } from 'models/HeadLine'
import headLines from '../../../data/news-us.json'

// TYPESCRIPT
interface headLinesState {
    headLines: HeadLine[] | null
    status: Status
    error: string | null
}

enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed'
}

// REDUX SLICE
const initialState: headLinesState = {
    headLines: null,
    status: Status.IDLE,
    error: null
}

const headLinesSlice = createSlice({
    name: 'headLines',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchHeadLines.fulfilled, (state, action) => {
            state.headLines = action.payload
            state.status = Status.SUCCEEDED
            state.error = null
        })
        builder.addCase(fetchHeadLines.pending, state => {
            state.status = Status.LOADING
        })
        builder.addCase(fetchHeadLines.rejected, (state, action) => {
            state.error = action.error.message || null
            state.status = Status.FAILED
        })
    }
})

// THUNK ACTIONS
const fetchHeadLines = createAsyncThunk('headLines/fetchHeadLines', async () => {
    if (__DEV__) {
        console.log('from JSON')
        return Promise.resolve(
            JSON.parse(JSON.stringify(headLines.articles)).map((article: HeadLine) => ({
                ...article,
                id: Math.random().toString(36).substring(2, 13)
            }))
        )
    } else {
        console.log('from Server')
        const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4ec6db6a4d684984be71b32e0ae36b91'
        const res = await axios.get(url)
        return res.data.articles.map((article: HeadLine) => ({
            ...article,
            id: Math.random().toString(36).substring(2, 13)
        }))
    }
})

// SELECTORS
const selectHeadLines = (state: { headLines: headLinesState }) => state.headLines.headLines

export { selectHeadLines, fetchHeadLines, Status }
export default headLinesSlice.reducer