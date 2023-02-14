import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Notification } from './notification'

export interface User extends FirebaseAuthTypes.User {
    favoriteHeadLineIds: string[]
    notifications: Notification[]
}