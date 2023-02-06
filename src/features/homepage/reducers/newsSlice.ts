import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface newsState {
    news: [] | null
    status: Status
    error: string | null
}

enum Status {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed'
}

const initialState: newsState = {
    news: null,
    status: Status.idle,
    error: null
}

const userSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        login: (state, action) => {
            state.news = action.payload
        },
        logout: state => {
            state.news = null
        }
    },
})

export const fetchPosts = createAsyncThunk('news/fetchNews', async () => {
    // const res = await client.get('/fakeApi/posts')
    // return res.data
})

const selectNews = (state: { news: newsState }) => state.news.news

const { login, logout } = userSlice.actions

export { selectNews, login, logout }
export default userSlice.reducer