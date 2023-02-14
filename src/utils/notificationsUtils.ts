import { Notification } from 'models/notification'
import { makeId } from './generalUtils'

const generateNewNotifcation = (text: string) => {
    return {
        id: makeId(),
        text,
        isUnread: true,
        createdAt: Date.now(),
    }
}

export { generateNewNotifcation }