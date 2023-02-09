const formatDate = (timestamp: string) => {
    const date = new Date(+timestamp)
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }
    return date.toLocaleString("en-US", options)
}

const formatDateLong = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export { formatDate, formatDateLong }