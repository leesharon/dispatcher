import { Pressable, StyleSheet, Text, View } from 'react-native'

interface AppButtonProps {
    children: string
    onPress: () => void
    icon?: any
    bgColor?: string
    textStyle?: { color: string, fontWeight: string } | {}
    innerContainerStyle?: { backgroundColor: string } | {}
    outerContainerStyle?: { marginBottom: number, borderRadius: number } | {}
}

function AppButton({ children, onPress, textStyle = {}, outerContainerStyle, innerContainerStyle, bgColor, icon }: AppButtonProps) {
    return (
        <View style={[styles.buttonOuterContainer, outerContainerStyle]}>
            <Pressable
                onPress={onPress}
                style={
                    ({ pressed }) => pressed
                        ? [styles.pressed, styles.buttonInnerContainer, innerContainerStyle]
                        : [styles.buttonInnerContainer, innerContainerStyle]
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

export default AppButton