import { Colors, Layout } from 'constants'
import { View, StyleSheet } from "react-native"

interface TopBarProps {
    children: React.ReactNode
}

const TopBar = ({ children }: TopBarProps): JSX.Element => {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BLUE800,
        height: 74,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        justifyContent: 'space-between',
    },
})

export { TopBar }