import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { showErrorMessage } from './userMsgsUtils'

export const authErrorHandler = (error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
    let msg = 'Oops! something went wrong'

    const errorCodeMsgs: { [key: string]: string } = {
        'auth/invalid-email': 'That email address is invalid!',
        'auth/user-not-found': 'No user found with that email address!',
        'auth/wrong-password': 'Wrong password!',
        'user-disabled': 'That user has been disabled!',
        'auth/email-already-in-use': 'That email address is already in use!',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/operation-not-allowed': 'Signing in with Email and Password is not enabled.',
        'auth/invalid-credential': 'The supplied auth credential is malformed or has expired.',
    }

    msg = errorCodeMsgs[error.code] || error.message

    console.log(msg)
    console.error(error)
    showErrorMessage(msg)
}