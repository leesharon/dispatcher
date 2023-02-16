import { Notification } from 'models/notification'
import { makeId } from './generalUtils'

const generateNewNotifcation = (text: string, headLineId: string) => {
    return {
        id: makeId(),
        text,
        isUnread: true,
        createdAt: Date.now(),
        headLineId,
    }
}

export { generateNewNotifcation }