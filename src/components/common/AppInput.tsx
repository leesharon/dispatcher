import { TextInput, StyleSheet } from "react-native"
import { Colors } from '../../../assets/colors'

enum ContentType {
    email = 'emailAddress',
    password = 'password',
    text = 'text'
}

interface AppInputProps {
    value: string
    setValue: (value: string) => void
    placeholderText: string
    contentType: ContentType
}

const AppInput = ({ value, setValue, placeholderText, contentType }: AppInputProps): JSX.Element => {

    return (
        <TextInput
            style={styles.input}
            onChangeText={text => setValue(text)}
            value={value}
            placeholder={placeholderText}
            placeholderTextColor={Colors.blue400}
            secureTextEntry={contentType === ContentType.password}
            keyboardType={(contentType === ContentType.email) ? "email-address" : "default"}
            textContentType={contentType as any}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#D9DBE9',
        borderRadius: 4,
        backgroundColor: 'white',
        height: 44,
        width: '100%',
        fontFamily: 'Roboto-Regular',
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        lineHeight: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 32 },
        shadowOpacity: 0.05,
        shadowRadius: 64,
    }
})

export { AppInput, ContentType }