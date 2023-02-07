import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Strings } from 'constants'
import { showErrorMessage } from './userMsgsUtils'

export const authErrorHandler = (error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
    let msg = 'Oops! something went wrong'

    const errorCodeMsgs: { [key: string]: string } = {
        'auth/invalid-email': Strings.INVALID_EMAIL_ADDRESS,
        'auth/user-not-found': Strings.USER_NOT_FOUND,
        'auth/wrong-password': Strings.WRONG_PASSWORD,
        'user-disabled': Strings.USER_DISABLED,
        'auth/email-already-in-use': Strings.EMAIL_ALREADY_IN_USE,
        'auth/weak-password': Strings.WEAK_PASSWORD,
        'auth/operation-not-allowed': Strings.OPERATION_NOT_ALLOWED,
        'auth/invalid-credential': Strings.INVALID_CREDENTIALS,
    }

    msg = errorCodeMsgs[error.code] || error.message

    console.log(msg)
    console.error(error)
    showErrorMessage(msg)
}