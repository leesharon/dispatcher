import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HeadLine } from 'models/HeadLine'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' }),
    endpoints: builder => ({
        getHeadLines: builder.query<HeadLine[], void>({
            query: () => '/top-headlines?country=us&apiKey=4ec6db6a4d684984be71b32e0ae36b91',
            transformResponse: (response: { articles: HeadLine[] }, meta, arg) => {
                return response.articles.map(article => ({ ...article, id: Math.random().toString(36).substring(2, 13) }))
            }
        })
    })
})

export const { useGetHeadLinesQuery } = apiSlice