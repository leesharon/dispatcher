import { FilterBy } from 'models/filter-by'
import { HeadLine } from 'models/headline'

export function getSourcesFromHeadlines(headlines: HeadLine[]): string[] {
    const sourcesMap: Record<string, boolean> = {}

    for (const headline of headlines) {
        sourcesMap[headline.source.name] = true
    }

    const sources = Object.keys(sourcesMap)
    sources.unshift('All')
    return sources
}

export function getFilteredHeadlines(
    headLines: HeadLine[],
    filterBy: FilterBy,
    searchValue: string | undefined): HeadLine[] {

    return headLines.filter(headline => {
        // source filter
        const isMatchingSource = filterBy.sources.value === 'All' || headline.source.name === filterBy.sources.value

        // search filter
        const isMatchingSearch = !searchValue || headline.title.toLowerCase().includes(searchValue.toLowerCase())

        // date filter
        let isMatchingDate = false
        const publishedAt = new Date(headline.publishedAt)
        switch (filterBy.dates.value) {
            case 'All':
                isMatchingDate = true
                break
            case 'Last 6 Hours':
                isMatchingDate = (Date.now() - publishedAt.getTime()) < (6 * 60 * 60 * 1000)
                break
            case 'Last 12 Hours':
                isMatchingDate = (Date.now() - publishedAt.getTime()) < (12 * 60 * 60 * 1000)
                break
            case 'Last Day':
                isMatchingDate = (Date.now() - publishedAt.getTime()) < (24 * 60 * 60 * 1000)
                break
            default:
                break
        }
        return isMatchingSource && isMatchingDate && isMatchingSearch
    })
}