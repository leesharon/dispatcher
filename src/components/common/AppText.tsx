import { Colors } from 'constants'
import { fontWeight } from 'models/fontWeight'
import { Text, StyleSheet } from "react-native"

interface AppTextProps {
    children: string
    styleProps?: {
        fontSize?: number
        color?: string
        fontFamily?: string
        fontWeight?: fontWeight
        marginBottom?: number
    }
}

const AppText = ({ children, styleProps }: AppTextProps): JSX.Element => {

    return (
        <Text style={[styles.text, styleProps]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: Colors.BLUE400,
    }
})

export { AppText }