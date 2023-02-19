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
        updateFilterBy: (state, action: PayloadAction<FilterBy>) => {
            state.filterBy = action.payload
        },
        updateSources: (state, action: PayloadAction<string[]>) => {
            state.filterBy.sources.options = action.payload
        }
    },
})

export const selectFilterBy =
    (state: { filter: filterState }) => state.filter.filterBy

export const { updateFilterBy, updateSources } = filterSlice.actions
export default filterSlice.reducer