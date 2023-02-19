import { View, StyleSheet } from "react-native"

interface SideMenuModalProps {
}

const SideMenuModal = ({ }: SideMenuModalProps): JSX.Element => {

    return (
        <View style={styles.screenContainer}>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
})

export { SideMenuModal }