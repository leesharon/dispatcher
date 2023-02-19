import { Layout } from 'constants'
import { View, StyleSheet } from "react-native"

interface MainContainerProps {
    children: JSX.Element | JSX.Element[]
}

const MainContainer = ({ children }: MainContainerProps): JSX.Element => {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: Layout.PADDING_VERTICAL,
    },
})

export { MainContainer }