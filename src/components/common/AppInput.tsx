import { useState } from 'react'
import { TextInput, StyleSheet, View, Pressable, Text } from "react-native"
import { Colors } from 'constants/index'
import Revealed from '../../../assets/revealed.svg'
import Hidden from '../../../assets/hidden.svg'

enum ContentType {
    email = 'emailAddress',
    password = 'password',
    text = 'text'
}

interface AppInputProps {
    value: string
    confirmValue?: string
    setValue: (value: string) => void
    placeholderText: string
    contentType: ContentType
    validate?: (value: string) => string | false
    confirmValidate?: (value: string, confirmValue: string) => string | false
    styleProps?: { marginBottom: number }
    error: string
    setError: (error: string) => void
}

const AppInput = ({ value, confirmValue, setValue, placeholderText, contentType, validate, confirmValidate, styleProps, error, setError }: AppInputProps): JSX.Element => {

    const [borderColor, setBorderColor] = useState(Colors.GRAY600)
    const [isRevealed, setIsRevealed] = useState(false)

    const handleChange = (text: string) => {
        setValue(text)

        let res
        if (confirmValue && confirmValidate) res = confirmValidate(text, confirmValue)
        else if (validate) res = validate(text)

        if (!res && error) {
            setError('')
            setBorderColor(Colors.BLUE800)
        } else if (res) {
            setError(res)
            setBorderColor(Colors.RED500)
        }
    }

    const handleFocus = () => {
        if (!error)
            setBorderColor(Colors.BLUE800)
    }

    const handleBlur = () => {
        let res
        if (confirmValue && confirmValidate) res = confirmValidate(value, confirmValue)
        else if (validate) res = validate(value)

        if (res) {
            setError(res)
            setBorderColor(Colors.RED500)
        }
        else {
            setError('')
            setBorderColor(Colors.GRAY600)
        }
    }

    if (contentType === ContentType.password) return (
        <View style={styleProps}>
            <View>
                <TextInput
                    style={[styles.input, { borderColor }]}
                    onChangeText={handleChange}
                    value={value}
                    placeholder={placeholderText}
                    placeholderTextColor={Colors.BLUE400}
                    secureTextEntry={contentType === ContentType.password && !isRevealed}
                    textContentType={contentType as any}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <View style={styles.imageContainer}>
                    <Pressable onPress={() => setIsRevealed(!isRevealed)}>
                        {isRevealed
                            ? <Revealed />
                            : <Hidden />}
                    </Pressable>
                </View>
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )

    else if (contentType === ContentType.email) return (
        <View style={styleProps}>
            <View>
                <TextInput
                    style={[styles.input, { borderColor }]}
                    onChangeText={handleChange}
                    value={value}
                    placeholder={placeholderText}
                    placeholderTextColor={Colors.BLUE400}
                    secureTextEntry={false}
                    keyboardType="email-address"
                    textContentType={contentType as any}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )

    else return (<Text>Something went wrong...</Text>)
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
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
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        right: 16,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: Colors.RED500,
        fontSize: 10,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'Roboto-Regular',
        position: 'absolute',
        top: 44,
    }
})

export { AppInput, ContentType }