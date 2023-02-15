import { View, StyleSheet, FlatList } from "react-native"
import { AppText } from 'components/common/AppText'
import { TopBar } from 'components/common/TopBar'
import { GoBackButton } from 'components/common/GoBackButton'
import { Colors, Strings } from 'constants'
import { useAppSelector } from 'state/hooks'
import { NotificationPreview } from './NotificationPreview'
import { selectNotifications } from '../reducers/notificationsSlice'

const Notifications = (): JSX.Element => {
    const notifications = useAppSelector(selectNotifications)

    return (
        <View style={styles.container}>
            <TopBar>
                <GoBackButton />
            </TopBar>
            <AppText styleProps={styles.header}>Notifications</AppText>
            {(notifications && notifications.length)
                ? <FlatList
                    data={notifications}
                    renderItem={({ item }) => <NotificationPreview
                        notification={item}
                    />}
                />
                : <AppText styleProps={styles.noNotifications}>{Strings.NO_NOTIFICATIONS}</AppText>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.BLUE800,
        paddingTop: 12,
        paddingBottom: 20,
        paddingLeft: 18,
    },
    noNotifications: {
        paddingLeft: 16,
    }
})

export { Notifications }