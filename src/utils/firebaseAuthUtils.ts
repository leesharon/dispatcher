import { navigate, resetTo } from './../navigation/RootNavigation'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { authErrorHandler } from './errorHandlerUtils'

const firebaseSignup = (email: string, password: string) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!')
            resetTo('MainTab')
        })
        .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            authErrorHandler(error)
        })
}

const firebaseLogin = (email: string, password: string) => {
    auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account signed in!')
            resetTo('MainTab')
        })
        .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            authErrorHandler(error)
        })
}

export { firebaseSignup, firebaseLogin }