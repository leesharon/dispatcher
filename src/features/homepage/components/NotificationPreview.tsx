import { AppText } from 'components/common/AppText'
import { Colors } from 'constants'
import { Notification } from 'models/notification'
import { View, StyleSheet, Pressable } from "react-native"
import RectangleIcon from '../assets/rectangle.svg'
import RectangleGrayIcon from '../assets/rectangle-gray.svg'
import ForwardIcon from '../assets/forward.svg'
import { useAppDispatch } from 'state/hooks'
import { push } from 'navigation/RootNavigation'

interface NotificationPreviewProps {
    notification: Notification
}

const NotificationPreview = ({ notification }: NotificationPreviewProps): JSX.Element => {
    const dispath = useAppDispatch()

    const onNotificationClick = () => {
        notification.isUnread &&
            dispath({ type: 'loggedinUser/markNotificationAsRead', payload: { id: notification.id } })
        push('HeadlineDetails', { id: notification.headLineId })
    }

    const backgroundColor = notification.isUnread ? Colors.PURPLE200 : Colors.GRAY100
    const color = notification.isUnread ? Colors.BLUE400 : Colors.GRAY800

    return (
        <Pressable
            onPress={onNotificationClick}
            style={[styles.container, { backgroundColor }]}
        >
            <View style={styles.rectangle}>
                {notification.isUnread ? <RectangleIcon /> : <RectangleGrayIcon />}
            </View>
            <AppText styleProps={{ color, maxWidth: '75%' }}>{notification.text}</AppText>
            <ForwardIcon style={styles.forward} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 65,
        alignItems: 'center',
        paddingStart: 8,
        paddingEnd: 20,
        marginBottom: 2,
        flexDirection: 'row',
    },
    rectangle: {
        paddingEnd: 8,
    },
    forward: {
        position: 'absolute',
        right: 20,
    }
})

export { NotificationPreview }