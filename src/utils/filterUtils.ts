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