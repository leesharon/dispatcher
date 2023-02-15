import { AppText } from 'components/common/AppText'
import { Colors } from 'constants'
import { Navigation } from 'constants/screens'
import { Notification } from 'models/notification'
import { View, StyleSheet } from "react-native"
import RectangleIcon from '../assets/rectangle.svg'
import RectangleGrayIcon from '../assets/rectangle-gray.svg'
import ForwardIcon from '../assets/forward.svg'

interface NotificationPreviewProps {
    notification: Notification
    navigation: Navigation
}

const NotificationPreview = ({ notification }: NotificationPreviewProps): JSX.Element => {
    console.log('NotificationPreview ~ notification', notification)

    const backgroundColor = notification.isUnread ? Colors.PURPLE200 : Colors.GRAY100
    const color = notification.isUnread ? Colors.BLUE400 : Colors.GRAY800

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.rectangle}>
                {notification.isUnread ? <RectangleIcon /> : <RectangleGrayIcon />}
            </View>
            <AppText styleProps={{ color, maxWidth: '75%' }}>{notification.text}</AppText>
            <ForwardIcon style={styles.forward} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 65,
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 20,
        marginBottom: 2,
        flexDirection: 'row',
    },
    rectangle: {
        paddingRight: 8,
    },
    forward: {
        position: 'absolute',
        right: 20,
    }
})

export { NotificationPreview }