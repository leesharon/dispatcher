import { Pressable, StyleSheet, Text, View } from 'react-native'

interface LogisterButtonProps {
    children: string
    onPress: () => void
    bgColor: string
}

function LogisterButton({ children, onPress, bgColor }: LogisterButtonProps) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                onPress={onPress}
                style={
                    ({ pressed }) => pressed
                        ? [styles.pressed, styles.buttonInnerContainer, { backgroundColor: bgColor }]
                        : [styles.buttonInnerContainer, { backgroundColor: bgColor }]
                }
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        height: 36,
        width: '100%',
    },
    buttonInnerContainer: {
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        fontWeight: '500',
    },
    pressed: {
        opacity: 0.85,
    },
})

export default LogisterButton