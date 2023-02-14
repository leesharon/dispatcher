import { View, StyleSheet, Pressable } from "react-native"
import SortByIcon from '../assets/sort-by.svg'
import FilterIcon from '../assets/filter.svg'
import { formatDate } from 'utils/dateUtils'
import { Colors, Layout } from 'constants'
import { AppText } from 'components/common/AppText'
import { User } from 'models/user'

interface FilterBarProps {
    loggedinUser: User
    setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterBar = ({ loggedinUser, setIsFilterMenuOpen }: FilterBarProps): JSX.Element => {

    return (
        <View>
            <View style={styles.filterBarContainer}>
                <SortByIcon />
                <Pressable onPress={() => { setIsFilterMenuOpen(true) }}>
                    <FilterIcon />
                </Pressable>
            </View>
            <View style={styles.lastLoginContainer}>
                <AppText styleProps={styles.lastLoginText}>Last Login:</AppText>
                {loggedinUser.metadata.lastSignInTime && <AppText styleProps={styles.lastLoginText}>
                    {formatDate(loggedinUser.metadata.lastSignInTime)}
                </AppText>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        fontFamily: 'Roboto-Bold',
        marginRight: 3,
    }
})

export { FilterBar }