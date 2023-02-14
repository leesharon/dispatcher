import { View, StyleSheet } from "react-native"
import { AppText } from 'components/common/AppText'

interface NotificationsProps {
}

const Notifications = ({ }: NotificationsProps): JSX.Element => {

    return (
        <View style={styles.container}>

            <AppText>Notifications</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export { Notifications }