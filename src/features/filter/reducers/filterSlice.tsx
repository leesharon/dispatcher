import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterBy } from 'models/filter-by'

interface filterState {
    filterBy: FilterBy
}

const initialState: filterState = {
    filterBy: {
        searchIn: { title: 'Search in', value: 'Everything', options: ['Everything', 'Headlines', 'Articles'] },
        sources: { title: 'Sources', value: 'All', options: ['All', 'BBC News', 'CNN', 'Fox News', 'The New York Times'] },
        languages: { title: 'Languages', value: 'All', options: ['All', 'English', 'Spanish', 'French', 'German'] },
        dates: { title: 'Dates', value: 'All', options: ['All', 'Today', 'This Week', 'This Month'] }
    },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // addRecentSearch: (state, action: PayloadAction<string>) => {
        //     state.recentSearches = [action.payload, ...state.recentSearches]
        // },
    },
})

export const selectFilterBy =
    (state: { filter: filterState }) => state.filter.filterBy

// export const { addRecentSearch } = filterSlice.actions
export default filterSlice.reducer