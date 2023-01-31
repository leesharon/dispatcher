import { useState } from 'react'
import { TextInput, StyleSheet, View, Pressable, Image } from "react-native"
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

    const [borderColor, setBorderColor] = useState(Colors.gray600)

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
            <Pressable style={styles.imageContainer} onPress={() => console.log('asd')}>
                <Image source={require('../../../assets/not-shown.png')} />
            </Pressable>
        </View>
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
        width: 30,
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -15 }],
    }
})

export { AppInput, ContentType }