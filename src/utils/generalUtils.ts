const makeId = () => {
    return Math.random().toString(36).substring(2, 13)
}

const sortBySearchTerm = (arr: string[], searchTerm: string): string[] => {
    searchTerm = searchTerm.toLowerCase()
    return arr.sort((a: string, b: string) => {
        // If the search term appears in both strings, sort based on index
        if (a.includes(searchTerm) && b.includes(searchTerm)) {
            return a.indexOf(searchTerm) - b.indexOf(searchTerm)
        }
        // If the search term only appears in one string, sort it first
        else if (a.includes(searchTerm)) {
            return -1
        }
        else if (b.includes(searchTerm)) {
            return 1
        }
        // If the search term doesn't appear in either string, sort alphabetically
        else {
            return a.localeCompare(b)
        }
    })
}

export { makeId, sortBySearchTerm }