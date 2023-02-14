import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' }),
    endpoints: builder => ({
        getHeadLines: builder.query({
            query: () => '/top-headlines?country=us&apiKey=4ec6db6a4d684984be71b32e0ae36b91'
        })
    })
})

export const { useGetHeadLinesQuery } = apiSlice