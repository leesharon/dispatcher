import { useState } from 'react'
import { View, Text, StyleSheet } from "react-native"
import { Colors } from 'constants/colors'
import Logo from '../assets/logo.svg'
import ArrowRight from '../../../../assets/arrow-right.svg'
import { AppInput, ContentType } from 'components/common/AppInput'
import { confirmPasswordPlaceholder, emailPlaceholder, passwordPlaceholder } from 'constants/strings'
import { validateEmail, validatePassword } from 'utils/validationUtils'
import { HorizontalLine } from 'components/common/HorizontalLine'
import LogisterButton from 'components/common/LogisterButton'

interface LogisterScreenProps {
}

enum Status {
    Login = 'Login',
    Signup = 'Signup',
}

const LogisterScreen = ({ }: LogisterScreenProps): JSX.Element => {

    const [status, setStatus] = useState<Status>(Status.Signup)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    return (
        <View style={styles.rootContainer}>
            <View style={styles.logoContainer}>
                <Logo />
            </View>
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.formTitle}>{status}</Text>
                    <View>
                        <AppInput
                            value={email}
                            setValue={setEmail}
                            placeholderText={emailPlaceholder}
                            contentType={ContentType.email}
                            validate={validateEmail}
                            styleProps={{ marginBottom: 24 }}
                        />
                        <AppInput
                            value={email}
                            setValue={setPassword}
                            placeholderText={passwordPlaceholder}
                            contentType={ContentType.password}
                            validate={validatePassword}
                            styleProps={{ marginBottom: 24 }}
                        />
                        <AppInput
                            value={email}
                            setValue={setConfirmPassword}
                            placeholderText={confirmPasswordPlaceholder}
                            contentType={ContentType.password}
                            validate={validateEmail}
                        />
                    </View>
                </View>
                <HorizontalLine />
                <View style={styles.buttonsContainer}>
                    <LogisterButton
                        onPress={() => console.log('Login')}
                        bgColor={Colors.BLUE500}
                        containerStyle={{ marginBottom: 24 }}
                        icon={<ArrowRight />}
                    >{status.toUpperCase()}
                    </LogisterButton>
                    <LogisterButton
                        onPress={() => console.log('Login')}
                        bgColor={Colors.GRAY500}
                        textStyle={styles.secondaryButtonText}
                    >{(status === Status.Login) ? Status.Signup.toUpperCase() : Status.Login.toUpperCase()}
                    </LogisterButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        height: '100%',
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
    buttonsContainer: {
        justifyContent: 'center',
    },
    secondaryButtonText: {
        color: Colors.BLUE400,
        fontWeight: '400',
    }
})

export { LogisterScreen }