import { View, Text, StyleSheet } from "react-native"
import SortByIcon from '../assets/sort-by.svg'
import FilterIcon from '../assets/filter.svg'
import { formatDate } from 'utils/dateUtils'
import { Colors, Layout } from 'constants'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface FilterBarProps {
    loggedinUser: any
}

const FilterBar = ({ loggedinUser }: FilterBarProps): JSX.Element => {

    return (
        <View>
            <View style={styles.filterBarContainer}>
                <SortByIcon />
                <FilterIcon />
            </View>
            <View style={styles.lastLoginContainer}>
                <Text style={[styles.lastLoginText, styles.boldText]}>Last Login:</Text>
                <Text style={styles.lastLoginText}>
                    {formatDate(loggedinUser.metadata.lastSignInTime)}
                </Text>
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
        color: Colors.BLUE400,
        fontFamily: 'Roboto-Regular',
    },
    boldText: {
        fontFamily: 'Roboto-Bold',
        marginRight: 3,
    }
})

export { FilterBar }