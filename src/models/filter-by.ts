export interface FilterBy {
    [key: string]: FilterOption
    searchIn: FilterOption
    sources: FilterOption
    languages: FilterOption
    dates: DatesOption
}

interface FilterOption {
    title: string
    value: string
    options: string[]
}

interface DatesOption extends FilterOption {
    options: ['All', 'Last 6 Hours', 'Last 12 Hours', 'Last Day']
}