import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HeadLine } from 'models/headline'

interface favoritesState {
    favoriteHeadLines: HeadLine[] | []
}

const initialState: favoritesState = {
    favoriteHeadLines: [],
}

const favoritesSlice = createSlice({
    name: 'favoriteHeadLines',
    initialState,
    reducers: {
        updateFavoritesFromStorage: (state, action: PayloadAction<HeadLine[]>) => {
            state.favoriteHeadLines = [...action.payload, ...state.favoriteHeadLines]
        },
        addFavoriteHeadLine: (state, action: PayloadAction<HeadLine>) => {
            state.favoriteHeadLines = [action.payload, ...state.favoriteHeadLines]
        },
        removeFavoriteHeadLine: (state, action: PayloadAction<string>) => {
            state.favoriteHeadLines = state.favoriteHeadLines.filter((headLine) => headLine.id !== action.payload)
        }
    },
})

export const selectFavorites =
    (state: { favoriteHeadLines: favoritesState }) => state.favoriteHeadLines.favoriteHeadLines

export const { updateFavoritesFromStorage, addFavoriteHeadLine, removeFavoriteHeadLine } = favoritesSlice.actions
export default favoritesSlice.reducer