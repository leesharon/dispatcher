import { useState } from 'react'
import { View, TextInput, StyleSheet } from "react-native"

interface AppInputProps {
    placeholderText: string
    isSecure?: boolean
    isEmail?: boolean
}

const AppInput = ({ placeholderText, isSecure, isEmail }: AppInputProps): JSX.Element => {

    const [textInputValue, setTextInputValue] = useState<string>('')

    return (
        <TextInput
            style={styles.input}
            onChangeText={text => setTextInputValue(text)}
            value={textInputValue}
            placeholder={placeholderText}
            placeholderTextColor='#5A5A89'
            secureTextEntry={isSecure}
            keyboardType={isEmail ? "email-address" : "default"}
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

export { AppInput }