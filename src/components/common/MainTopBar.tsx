import { useMemo } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'

import { selectNotifications } from 'features/notifications/reducers/notificationsSlice'
import { navigate, push } from 'navigation/RootNavigation'
import { TopBar } from './TopBar'

import Logo from '../../../assets/logo.svg'
import SearchIcon from '../../../assets/search.svg'
import RedDotIcon from '../../../assets/red-dot.svg'
import NotificationsIcon from '../../../assets/notifications.svg'
import { useAppSelector } from 'state/hooks'

const MainTopBar = (): JSX.Element => {

    const notifications = useAppSelector(selectNotifications)

    const isUnreadNotifications = useMemo(() => {
        if (!notifications.length) return false
        return notifications.some(notification => notification.isUnread)
    }, [notifications])

    return (
        <TopBar>
            <Logo />
            <View style={styles.iconsContainer}>
                <Pressable
                    style={styles.iconContainer}
                    onPress={() => { push('Search') }}
                >
                    <SearchIcon />
                </Pressable>
                <View>
                    <Pressable onPress={() => { navigate('Notifications') }}>
                        <NotificationsIcon />
                    </Pressable>
                    <View style={styles.redDotContainer}>
                        {isUnreadNotifications && <RedDotIcon />}
                    </View>
                </View>
            </View>
        </TopBar>
    )
}

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginEnd: 20,
    },
    redDotContainer: {
        position: 'absolute',
        top: -3,
        end: -1,
    },
})

export { MainTopBar }