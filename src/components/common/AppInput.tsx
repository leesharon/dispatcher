import { useEffect, useState } from 'react'
import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native'
import { Colors, Fonts } from 'constants/index'
import Revealed from '../../../assets/revealed.svg'
import Hidden from '../../../assets/hidden.svg'
import { textContentType } from 'models/text-content-type'

enum ContentType {
    EMAIL = 'emailAddress',
    PASSWORD = 'password',
    TEXT = 'text'
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
    error?: string
    setError?: (error: string) => void
    isEditable?: boolean
}

const AppInput = ({
    value,
    confirmValue,
    setValue,
    placeholderText,
    isEditable,
    contentType,
    validate,
    confirmValidate,
    styleProps,
    error,
    setError
}: AppInputProps): JSX.Element => {

    const [borderColor, setBorderColor] = useState(Colors.GRAY600)
    const [isRevealed, setIsRevealed] = useState(false)

    useEffect(() => {
        if (!value) setBorderColor(Colors.GRAY600)
    }, [value])

    const handleChange = (text: string) => {
        setValue(text)

        let res
        if (confirmValue && confirmValidate) res = confirmValidate(text, confirmValue)
        else if (validate) res = validate(text)

        if (!res && error) {
            setError && setError('')
            setBorderColor(Colors.BLUE800)
        } else if (res) {
            setError && setError(res)
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
            setError && setError(res)
            setBorderColor(Colors.RED500)
        }
        else {
            setError && setError('')
            setBorderColor(Colors.GRAY600)
        }
    }

    if (contentType === ContentType.PASSWORD) return (
        <View style={styleProps}>
            <View>
                <TextInput
                    style={[styles.input, { borderColor }]}
                    onChangeText={handleChange}
                    value={value}
                    placeholder={placeholderText}
                    placeholderTextColor={Colors.BLUE400}
                    secureTextEntry={contentType === ContentType.PASSWORD && !isRevealed}
                    textContentType={contentType as textContentType}
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

    else if (contentType === ContentType.EMAIL) return (
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
                    textContentType={contentType as textContentType}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={isEditable}
                    focusable={isEditable}
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )

    else if (contentType === ContentType.TEXT) return (
        <View style={styleProps}>
            <View>
                <TextInput
                    style={[styles.input, { borderColor }]}
                    onChangeText={handleChange}
                    value={value}
                    placeholder={placeholderText}
                    placeholderTextColor={Colors.BLUE400}
                    secureTextEntry={false}
                    textContentType={contentType as textContentType}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={isEditable}
                    focusable={isEditable}
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
        backgroundColor: Colors.WHITE,
        height: 44,
        width: '100%',
        fontFamily: Fonts.ROBOTO_REGULAR,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        lineHeight: 22,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 32 },
        shadowOpacity: 0.05,
        shadowRadius: 64,
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        end: 16,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: Colors.RED500,
        fontSize: 10,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: Fonts.ROBOTO_REGULAR,
        position: 'absolute',
        top: 44,
    }
})

export { AppInput, ContentType }