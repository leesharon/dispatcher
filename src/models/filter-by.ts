export interface FilterBy {
    [key: string]: FilterOption
    searchIn: FilterOption
    sources: FilterOption
    languages: FilterOption
    dates: FilterOption
}

interface FilterOption {
    title: string
    value: string
    options: string[]
}