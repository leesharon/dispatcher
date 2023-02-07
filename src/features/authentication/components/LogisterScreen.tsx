import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppInput, ContentType } from 'components/common/AppInput'
import { HorizontalLine } from 'components/common/HorizontalLine'
import AppButton from 'components/common/AppButton'
import { validateConfirmPassword, validateEmail, validatePassword } from 'utils/validationUtils'
import { firebaseLogin, firebaseSignup } from 'utils/firebaseAuthUtils'
import { showAlertMessage } from 'utils/userMsgsUtils'
import { Colors, Strings } from 'constants/index'
import Logo from '../assets/logo.svg'
import ArrowRight from '../../../../assets/arrow-right.svg'
interface LogisterScreenProps {
}

enum Status {
    Login = 'Login',
    Signup = 'Signup',
}

const LogisterScreen = ({ }: LogisterScreenProps): JSX.Element => {

    const [status, setStatus] = useState<Status>(Status.Signup)

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState('')

    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState('')

    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const onSignup = () => {
        if (!isFormValid())
            showAlertMessage('Oh oh!', 'Please fill out the form correctly.')
        else firebaseSignup(email, password)
    }

    const onLogin = () => {
        if (!isFormValid())
            showAlertMessage('Oh oh!', 'Please fill out the form correctly.')
        else firebaseLogin(email, password)
    }

    const isFormValid = () => {
        if (status === Status.Login) return email && password && !emailError && !passwordError
        else return email && password && confirmPassword && !emailError && !passwordError && !confirmPasswordError
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            {/* <View style={styles.rootContainer}> */}
            <View style={styles.logoContainer}>
                <Logo />
            </View>
            <View style={styles.mainContainer}>
                <KeyboardAvoidingView behavior="position" style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                    <View>
                        <Text style={styles.formTitle}>{status}</Text>
                        <View>
                            <AppInput
                                value={email}
                                setValue={setEmail}
                                placeholderText={Strings.EMAIL_PLACEHOLDER}
                                contentType={ContentType.email}
                                validate={validateEmail}
                                styleProps={styles.formInput}
                                error={emailError}
                                setError={setEmailError}
                            />
                            <AppInput
                                value={password}
                                setValue={setPassword}
                                placeholderText={Strings.PASSWORD_PLACEHOLDER}
                                contentType={ContentType.password}
                                validate={validatePassword}
                                styleProps={styles.formInput}
                                error={passwordError}
                                setError={setPasswordError}
                            />
                            {(status === Status.Signup) && <AppInput
                                value={confirmPassword}
                                confirmValue={password}
                                setValue={setConfirmPassword}
                                placeholderText={Strings.CONFIRM_PASSWORD_PLACEHOLDER}
                                contentType={ContentType.password}
                                confirmValidate={validateConfirmPassword}
                                error={confirmPasswordError}
                                setError={setConfirmPasswordError}
                            />}
                        </View>
                    </View>
                    <HorizontalLine />
                    <View style={styles.buttonsContainer}>
                        <AppButton
                            onPress={() => (status === Status.Login) ? onLogin() : onSignup()}
                            innerContainerStyle={{ backgroundColor: (isFormValid()) ? Colors.BLUE500 : Colors.BLUE300 }}
                            outerContainerStyle={{ marginBottom: 24 }}
                            icon={<ArrowRight />}
                        >{status.toUpperCase()}
                        </AppButton>
                        <AppButton
                            onPress={() => setStatus((status === Status.Login) ? Status.Signup : Status.Login)}
                            innerContainerStyle={{ backgroundColor: Colors.GRAY500 }}
                            textStyle={styles.secondaryButtonText}
                        >{(status === Status.Login) ? Status.Signup.toUpperCase() : Status.Login.toUpperCase()}
                        </AppButton>
                    </View>
                </KeyboardAvoidingView>
            </View>
            {/* </View> */}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // flexGrow: 1,
    },
    logoContainer: {
        height: '35%',
        backgroundColor: Colors.BLUE800,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.BLUE100,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: 'space-between',
    },
    formTitle: {
        color: Colors.BLUE400,
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        paddingLeft: 10,
        paddingBottom: 12,
    },
    formInput: {
        marginBottom: 24,
    },
    buttonsContainer: {
        justifyContent: 'center',
    },
    secondaryButtonText: {
        color: Colors.BLUE400,
        fontWeight: '400',
    }
})

export { LogisterScreen }