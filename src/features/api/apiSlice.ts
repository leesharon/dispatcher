import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HeadLine } from 'models/headline'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' }),
    endpoints: builder => ({
        getHeadLines: builder.query<HeadLine[], void>({
            query: () => '/top-headlines?country=us&apiKey=4ec6db6a4d684984be71b32e0ae36b91',
            transformResponse: (response: { articles: HeadLine[] }) => {
                return response.articles.map(article => ({ ...article, id: (new Date(article.publishedAt).getTime() / 1000).toString() }))
            }
        })
    })
})

export const { useGetHeadLinesQuery } = apiSlice