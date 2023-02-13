import { pop } from './../navigation/RootNavigation';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Screens } from 'constants'
import { authErrorHandler } from './errorHandlerUtils'

const firebaseSignup = (email: string, password: string, navigation: any) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!')
            navigation.navigate(Screens.HOMEPAGE)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Homepage' }],
            })
        })
        .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            authErrorHandler(error)
        })
}

const firebaseLogin = (email: string, password: string, navigation: any) => {
    auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account signed in!')
            navigation.navigate(Screens.HOMEPAGE)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Homepage' }],
            })
        })
        .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            authErrorHandler(error)
        })
}

export { firebaseSignup, firebaseLogin }