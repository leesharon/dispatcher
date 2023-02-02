import { useState } from 'react'
import { View, Text, StyleSheet } from "react-native"
import { Colors } from 'constants/colors'
import Logo from '../assets/logo.svg'
import { AppInput, ContentType } from 'components/common/AppInput'
import { emailPlaceholder } from 'constants/strings'
import { validateEmail } from 'utils/validationUtils'

interface LogisterScreenProps {
}

enum Status {
    Login = 'Login',
    Signup = 'Signup',
}

const LogisterScreen = ({ }: LogisterScreenProps): JSX.Element => {

    const [status, setStatus] = useState<Status>(Status.Signup)
    const [email, setEmail] = useState<string>('')

    return (
        <View style={styles.rootContainer}>
            <View style={styles.logoContainer}>
                <Logo />
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.formTitle}>{status}</Text>
                <View style={styles.formContainer}>
                    <AppInput
                        value={email}
                        setValue={setEmail}
                        placeholderText={emailPlaceholder}
                        contentType={ContentType.email}
                        validate={validateEmail}
                    />
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
    },
    formTitle: {
        color: Colors.BLUE400,
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        paddingLeft: 20,
    },
    formContainer: {
    }
})

export { LogisterScreen }