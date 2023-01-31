import { useState } from 'react'
import { TextInput, StyleSheet, View, Pressable, Image } from "react-native"
import { Colors } from '../../../assets/colors'
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
}

const AppInput = ({ value, setValue, placeholderText, contentType }: AppInputProps): JSX.Element => {

    const [borderColor, setBorderColor] = useState(Colors.gray600)
    const [isRevealed, setIsRevealed] = useState(false)

    return (
        <View>
            <TextInput
                style={[styles.input, { borderColor }]}
                onChangeText={text => setValue(text)}
                value={value}
                placeholder={placeholderText}
                placeholderTextColor={Colors.blue400}
                secureTextEntry={contentType === ContentType.password}
                keyboardType={(contentType === ContentType.email) ? "email-address" : "default"}
                textContentType={contentType as any}
                onFocus={() => setBorderColor(Colors.blue800)}
                onBlur={() => setBorderColor(Colors.gray600)}
            />
            {
                (contentType === ContentType.email) && (
                    <View style={styles.imageContainer}>
                        <Pressable onPress={() => setIsRevealed(!isRevealed)}>
                            {isRevealed
                                ? <Revealed />
                                : <Hidden />}
                        </Pressable>
                    </View>
                )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    input: {
        transition: 'border-color 0.2s ease-in-out',
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
    }
})

export { AppInput, ContentType }