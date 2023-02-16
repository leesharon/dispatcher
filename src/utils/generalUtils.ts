const makeId = () => {
    return Math.random().toString(36).substring(2, 13)
}

export { makeId }