import { View, StyleSheet } from "react-native"
import { AppText } from 'components/common/AppText'
import { TopBar } from 'components/common/TopBar'
import { GoBackButton } from 'components/common/GoBackButton'
import { Navigation } from 'constants/screens'

interface NotificationsProps {
    navigation: Navigation
}

const Notifications = ({ navigation }: NotificationsProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <TopBar>
                <GoBackButton navigation={navigation} />
            </TopBar>
            <AppText>Notifications</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export { Notifications }