import { Colors } from 'constants/colors'
import { View, Text, StyleSheet } from "react-native"

interface HorizontalLineProps {
    styleProps?: { marginBottom: number }
}

const HorizontalLine = ({ styleProps }: HorizontalLineProps): JSX.Element => {

    return (
        <View style={[styles.line, styleProps]}>
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.GRAY600,
        opacity: 0.5,
    }
})

export { HorizontalLine }