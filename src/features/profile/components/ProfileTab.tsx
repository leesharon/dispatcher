import { StyleSheet, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Shadow } from 'react-native-shadow-2'
import { useAppSelector } from 'state/hooks'
import { AppText } from 'components/common/AppText'
import { Colors, Layout, Strings } from 'constants'
import { selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'
import UserIcon from '../assets/user.svg'
import SettingsIcon from '../assets/settings.svg'
import TermsIcon from '../assets/terms.svg'
import LogoutIcon from '../assets/logout.svg'

const menuItems = [
    { text: Strings.SETTINGS, icon: <SettingsIcon />, onPress: () => { console.log('settings') } },
    { text: Strings.TERMS, icon: <TermsIcon />, onPress: () => { console.log('TERMS') } },
    { text: Strings.LOGOUT, icon: <LogoutIcon />, onPress: () => { console.log('LOGOUT') } },
]

const ProfileTab = (): JSX.Element => {
    const loggedinUser = useAppSelector(selectLoggedinUser)

    if (!loggedinUser) return <AppText>{Strings.MUST_BE_LOGGEDIN}</AppText>

    return (
        <SafeAreaView style={styles.container}>
            <Shadow style={styles.shadowContainer}>
                <View style={styles.header}>
                    <AppText styleProps={styles.hi}>
                        {'Hi ' + (loggedinUser.displayName || loggedinUser.email || 'User')}
                    </AppText>
                    <AppText>
                        {Strings.EDIT_PROFILE}
                    </AppText>
                </View>
                <View style={styles.userIconContainer}>
                    <UserIcon />
                </View>
            </Shadow>
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <View key={index}>
                        <AppText>{item.text}</AppText>
                        {item.icon}
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    shadowContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.09,
        shadowRadius: 10,
        elevation: 10,
        height: 80,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: Layout.PADDING_HORIZONTAL,
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
    },
    hi: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.BLUE800,
        paddingBottom: 5,
    },
    userIconContainer: {
        justifyContent: 'center',
    },
    menuContainer: {
        flex: 1,

    },
})

export { ProfileTab }