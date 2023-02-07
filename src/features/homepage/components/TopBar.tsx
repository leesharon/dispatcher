import { Colors, Layout } from 'constants'
import { View, StyleSheet } from "react-native"

import Logo from '../assets/logo.svg'
import SearchIcon from '../assets/search.svg'
import RedDotIcon from '../assets/red-dot.svg'
import NotificationsIcon from '../assets/notifications.svg'

interface TopBarProps {
}

const TopBar = ({ }: TopBarProps): JSX.Element => {

    return (
        <View style={styles.container}>
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
    )
}

const styles = StyleSheet.create({
    container: {
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
})

export { TopBar }