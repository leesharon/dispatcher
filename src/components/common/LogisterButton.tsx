import { Pressable, StyleSheet, Text, View } from 'react-native'

interface LogisterButtonProps {
    children: string
    onPress: () => void
    icon?: any
    bgColor?: string
    textStyle?: { color: string, fontWeight: string } | {}
    containerStyle?: { marginBottom: number }
}

function LogisterButton({ children, onPress, textStyle = {}, containerStyle, bgColor, icon }: LogisterButtonProps) {
    return (
        <View style={[styles.buttonOuterContainer, containerStyle]}>
            <Pressable
                onPress={onPress}
                style={
                    ({ pressed }) => pressed
                        ? [styles.pressed, styles.buttonInnerContainer, { backgroundColor: bgColor }]
                        : [styles.buttonInnerContainer, { backgroundColor: bgColor }]
                }
            >
                <Text style={[styles.buttonText, textStyle]}>{children}</Text>
                <View style={styles.arrowImage}>
                    {icon && icon}
                </View>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    arrowImage: {
        marginLeft: 8,
    }
})

export default LogisterButton