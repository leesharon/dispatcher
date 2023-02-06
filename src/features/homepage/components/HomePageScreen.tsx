import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Layout } from 'constants'

import Logo from '../assets/logo.svg'
import SearchIcon from '../assets/search.svg'
import NotificationsIcon from '../assets/notifications.svg'
import SortByIcon from '../assets/sort-by.svg'
import FilterIcon from '../assets/filter.svg'
import RedDotIcon from '../assets/red-dot.svg'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { formatTime } from 'utils/dateUtils'

interface HomePageScreenProps {
    loggedinUser: any
}

const HomePageScreen = ({ loggedinUser }: HomePageScreenProps): JSX.Element => {

    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.topBarContainer}>
                <Logo />
                <View style={styles.iconsContainer}>
                    <View style={styles.iconContainer}>
                        <SearchIcon />
                    </View>
                    <View>
                        <NotificationsIcon />
                        <View style={styles.redDotContainer}>
                            <RedDotIcon />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.filterBarContainer}>
                <SortByIcon />
                <FilterIcon />
            </View>
            <View style={styles.lastLoginContainer}>
                <Text style={[styles.lastLoginText, styles.boldText]}>Last Login:</Text>
                <Text style={styles.lastLoginText}>
                    {/* 03:50 PM, 09.03.2022 */}
                    {formatTime(loggedinUser.lastSignInTime)}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        flexGrow: 1,
    },
    topBarContainer: {
        backgroundColor: Colors.BLUE800,
        height: 74,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        justifyContent: 'space-between',
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
    filterBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: Layout.PADDING_HORIZONTAL,
        paddingRight: 12,
        height: 44,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.GRAY600,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
            width: 0,
            height: 32,
        },
        shadowRadius: 64,
        shadowOpacity: 1,
    },
    lastLoginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: Layout.PADDING_HORIZONTAL,
    },
    lastLoginText: {
        fontSize: 12,
        color: Colors.BLUE400,
        fontFamily: 'Roboto-Regular',
    },
    boldText: {
        fontFamily: 'Roboto-Bold',
        marginRight: 3,
    }
})

export { HomePageScreen }