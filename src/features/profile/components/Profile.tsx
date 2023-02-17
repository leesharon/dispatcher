import { Pressable, StyleSheet, View } from "react-native"
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
import { HorizontalLine } from 'components/common/HorizontalLine'
import { firebaseLogout } from 'utils/firebaseAuthUtils'
import { push } from 'navigation/RootNavigation'
import { Header1 } from 'components/common/Header1'

const menuItems = [
    { id: '1aqads123', text: Strings.SETTINGS, icon: <SettingsIcon />, onPress: () => { push('Settings') } },
    { id: '2basdASA2', text: Strings.TERMS, icon: <TermsIcon />, onPress: () => { push('Terms') } },
    { id: '3casd@@!!!', text: Strings.LOGOUT, icon: <LogoutIcon />, onPress: firebaseLogout },
]

const Profile = (): JSX.Element => {
    const loggedinUser = useAppSelector(selectLoggedinUser)

    if (!loggedinUser) return <AppText>{Strings.MUST_BE_LOGGEDIN}</AppText>

    return (
        <SafeAreaView style={styles.container}>
            <Shadow style={styles.shadowContainer}>
                <View style={styles.header}>
                    <Header1>
                        {'Hi ' + (loggedinUser.displayName || loggedinUser.email || 'User')}
                    </Header1>
                    <Pressable onPress={() => push('ProfileEdit')}>
                        <AppText>
                            {Strings.EDIT_PROFILE}
                        </AppText>
                    </Pressable>
                </View>
                <View style={styles.userIconContainer}>
                    <UserIcon />
                </View>
            </Shadow>
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <View key={item.id}>
                        <Pressable
                            key={item.id}
                            style={[styles.menuItem, (index === 0) && { paddingStart: 2 }]}
                            onPress={item.onPress}
                        >
                            {item.icon}
                            <AppText styleProps={styles.menuItemText}>{item.text}</AppText>
                        </Pressable>
                        {index !== menuItems.length - 1 && <HorizontalLine />}
                    </View>
                ))}
            </View>
        </SafeAreaView >
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
        paddingBottom: 10,
    },
    userIconContainer: {
        justifyContent: 'center',
    },
    menuContainer: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    menuItemText: {
        fontSize: 16,
        color: Colors.BLUE800,
        paddingStart: 10,
    },
})

export { Profile }