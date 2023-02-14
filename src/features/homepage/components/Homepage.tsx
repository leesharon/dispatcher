import { Pressable, StyleSheet, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopBar } from '../../../components/common/TopBar'
import { FilterBar } from './FilterBar'
import { HeadLinesFeed } from './HeadLinesFeed'
import { useGetHeadLinesQuery } from 'features/api/apiSlice'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'
import { AppText } from 'components/common/AppText'
import { Navigation } from 'constants/screens'
import Logo from '../assets/logo.svg'
import SearchIcon from '../assets/search.svg'
import RedDotIcon from '../assets/red-dot.svg'
import NotificationsIcon from '../assets/notifications.svg'

interface HomepageProps {
    navigation: Navigation
}

const Homepage = ({ navigation }: HomepageProps): JSX.Element => {
    const loggedinUser = useSelector(selectLoggedinUser)

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

    const { data: headLines, isLoading, isSuccess, isError, error } = useGetHeadLinesQuery()

    const isUnreadNotifications = useMemo(() => {
        if (!loggedinUser || !loggedinUser.notifications.length) return false
        return loggedinUser.notifications.some(notification => notification.isUnread)
    }, [loggedinUser?.notifications])

    if (!loggedinUser) return <AppText>You must be logged in to view this page</AppText>

    if (!headLines) return <AppText>Loading...</AppText>

    return (
        <SafeAreaView style={styles.rootContainer}>
            {isFilterMenuOpen &&
                <Pressable
                    style={styles.backdrop}
                    onPress={() => { setIsFilterMenuOpen(false) }}
                >
                </Pressable>
            }
            <TopBar>
                <Logo />
                <View style={styles.iconsContainer}>
                    <View style={styles.iconContainer}>
                        <SearchIcon />
                    </View>
                    <View>
                        <NotificationsIcon />
                        <View style={styles.redDotContainer}>
                            {isUnreadNotifications && <RedDotIcon />}
                        </View>
                    </View>
                </View>
            </TopBar>
            <FilterBar
                loggedinUser={loggedinUser}
                setIsFilterMenuOpen={setIsFilterMenuOpen}
            />
            <HeadLinesFeed headLines={headLines} navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        flexGrow: 1,
        position: 'relative',
        paddingBottom: 200,
    },
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 5
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 20,
    },
    redDotContainer: {
        position: 'absolute',
        top: -3,
        right: -1,
    },
})

export { Homepage }