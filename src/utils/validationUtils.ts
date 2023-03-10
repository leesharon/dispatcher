export const validatePassword = (password: string): string | false => {
    const regexLower = /^(?=.*[a-z]).+$/
    const regexUpper = /^(?=.*[A-Z]).+$/
    const regexNumber = /^(?=.*\d).+$/
    const regexLength = /^.{12,}$/

    if (!regexLower.test(password))
        return 'Password must contain at least one lowercase letter'

    if (!regexUpper.test(password))
        return 'Password must contain at least one uppercase letter'

    if (!regexNumber.test(password))
        return 'Password must contain at least one number'

    if (!regexLength.test(password))
        return 'Password must be at least 12 characters long'

    return false
}

export const validateConfirmPassword = (value: string, confirmValue: string): string | false => {
    if (value !== confirmValue) return 'Passwords do not match'
    return false
}

export const validateEmail = (email: string): string | false => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(String(email).toLowerCase())) return 'Invalid email'
    return false
}