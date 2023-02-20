import { View, StyleSheet, FlatList } from 'react-native'
import { AppText } from 'components/common/AppText'
import { TopBar } from 'components/common/TopBar'
import { GoBackButton } from 'components/common/GoBackButton'
import { Strings } from 'constants'
import { useAppSelector } from 'state/hooks'
import { NotificationPreview } from './NotificationPreview'
import { selectNotifications } from '../reducers/notificationsSlice'
import { Heading1 } from 'components/common/Heading1'

const Notifications = (): JSX.Element => {
    const notifications = useAppSelector(selectNotifications)

    return (
        <View style={styles.container}>
            <TopBar>
                <GoBackButton />
            </TopBar>
            <View style={styles.headerContainer}>
                <Heading1>Notifications</Heading1>
            </View>
            {(notifications && notifications.length)
                ? <FlatList
                    data={notifications}
                    keyExtractor={item => item.id}
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
    headerContainer: {
        paddingTop: 12,
        paddingStart: 18,
    },
    noNotifications: {
        paddingStart: 16,
    }
})

export { Notifications }