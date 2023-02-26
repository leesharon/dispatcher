import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppInput, ContentType } from 'components/common/AppInput'
import { HorizontalLine } from 'components/common/HorizontalLine'
import AppButton from 'components/common/AppButton'
import { validateConfirmPassword, validateEmail, validatePassword } from 'utils/validationUtils'
import { firebaseLogin, firebaseSignup } from 'utils/firebaseAuthUtils'
import { showAlertMessage } from 'utils/userMsgsUtils'
import { Colors, Constants, Fonts, Strings } from 'constants/index'
import Logo from '../assets/logo.svg'
import ArrowRight from '../../../../assets/arrow-right.svg'

enum Status {
    LOGIN = 'Login',
    SIGNUP = 'Signup',
}

const LogisterScreen = (): JSX.Element => {

    const [status, setStatus] = useState<Status>(Status.SIGNUP)

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState('')

    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState('')

    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    useEffect(() => {
        setEmail('')
        setEmailError('')
        setPassword('')
        setPasswordError('')
        setConfirmPassword('')
        setConfirmPasswordError('')
    }, [status])

    const onSignup = () => {
        if (!isFormValid())
            showAlertMessage(Strings.OH_OH, Strings.FORM_ERROR)
        else
            firebaseSignup(email, password)
    }

    const onLogin = () => {
        if (!isFormValid())
            showAlertMessage(Strings.OH_OH, Strings.FORM_ERROR)
        else
            firebaseLogin(email, password)
    }

    const isFormValid = () => {
        if (status === Status.LOGIN)
            return email && password && !emailError && !passwordError
        else
            return email && password && confirmPassword && !emailError && !passwordError && !confirmPasswordError
    }

    const btnInnerContainerStyle = { backgroundColor: (isFormValid()) ? Colors.BLUE500 : Colors.BLUE300 }

    return (
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView
                behavior={Constants.IS_IOS ? 'position' : 'height'}
                style={styles.container}
                contentContainerStyle={styles.container}
            >
                <View style={styles.logoContainer}>
                    <Logo />
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.inputsContainer}>
                        <Text style={styles.formTitle}>{status}</Text>
                        <View>
                            <AppInput
                                value={email}
                                setValue={setEmail}
                                placeholderText={Strings.EMAIL_PLACEHOLDER}
                                contentType={ContentType.EMAIL}
                                validate={validateEmail}
                                styleProps={styles.formInput}
                                error={emailError}
                                setError={setEmailError}
                            />
                            <AppInput
                                value={password}
                                setValue={setPassword}
                                placeholderText={Strings.PASSWORD_PLACEHOLDER}
                                contentType={ContentType.PASSWORD}
                                validate={validatePassword}
                                styleProps={styles.formInput}
                                error={passwordError}
                                setError={setPasswordError}
                            />
                            {(status === Status.SIGNUP) && <AppInput
                                value={confirmPassword}
                                confirmValue={password}
                                setValue={setConfirmPassword}
                                placeholderText={Strings.CONFIRM_PASSWORD_PLACEHOLDER}
                                contentType={ContentType.PASSWORD}
                                confirmValidate={validateConfirmPassword}
                                error={confirmPasswordError}
                                setError={setConfirmPasswordError}
                            />}
                        </View>
                    </View>
                    <HorizontalLine styleProps={styles.horizontalLine} />
                    <View style={styles.buttonsContainer}>
                        <AppButton
                            onPress={() => (status === Status.LOGIN) ? onLogin() : onSignup()}
                            innerContainerStyle={btnInnerContainerStyle}
                            outerContainerStyle={styles.btnOuterContainer}
                            icon={<ArrowRight />}
                        >{status.toUpperCase()}
                        </AppButton>
                        <AppButton
                            onPress={() => setStatus((status === Status.LOGIN) ? Status.SIGNUP : Status.LOGIN)}
                            innerContainerStyle={styles.secondaryBtnInnerContainer}
                            textStyle={styles.secondaryButtonText}
                        >{(status === Status.LOGIN) ? Status.SIGNUP.toUpperCase() : Status.LOGIN.toUpperCase()}
                        </AppButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLUE100,
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
    inputsContainer: {
        paddingBottom: 50,
    },
    formTitle: {
        color: Colors.BLUE400,
        fontSize: 24,
        fontFamily: Fonts.ROBOTO_BOLD,
        paddingStart: 10,
        paddingBottom: 12,
    },
    formInput: {
        marginBottom: 24,
    },
    horizontalLine: {
        marginBottom: 50,
    },
    buttonsContainer: {
        justifyContent: 'center',
    },
    btnOuterContainer: {
        marginBottom: 24
    },
    secondaryBtnInnerContainer: {
        backgroundColor: Colors.GRAY500
    },
    secondaryButtonText: {
        color: Colors.BLUE400,
        fontWeight: '400',
    }
})

export { LogisterScreen }