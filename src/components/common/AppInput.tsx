import { useState } from 'react'
import { TextInput, StyleSheet, View, Pressable, Text } from "react-native"
import { Colors } from '../../constants/colors'
import Revealed from '../../../assets/revealed.svg'
import Hidden from '../../../assets/hidden.svg'

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
    validate: (value: string) => string | false
}

const AppInput = ({ value, setValue, placeholderText, contentType, validate }: AppInputProps): JSX.Element => {

    const [borderColor, setBorderColor] = useState(Colors.GRAY600)
    const [isRevealed, setIsRevealed] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (text: string) => {
        setValue(text)
        const res = validate(text)
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
        const res = validate(value)
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
        <View>
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
        <View>
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
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Roboto-Regular',
        marginTop: 4
    }
})

export { AppInput, ContentType }