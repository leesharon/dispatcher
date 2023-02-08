import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    // reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' }),
    endpoints: builder => ({
        getHeadLines: builder.query({
            query: () => '/top-headlines?country=us&apiKey=4ec6db6a4d684984be71b32e0ae36b91'
        })
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetHeadLinesQuery } = apiSlice