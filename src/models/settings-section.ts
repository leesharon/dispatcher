export interface SettingsSection {
    title: string
    items: {
        title: string
        text?: string | undefined
        element: 'switch' | 'select'
        value: boolean
    }[]
}
