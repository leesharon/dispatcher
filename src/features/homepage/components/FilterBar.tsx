import { View, StyleSheet, Pressable } from "react-native"
import SortByIcon from '../assets/sort-by.svg'
import FilterIcon from '../assets/filter.svg'
import { Colors, Layout } from 'constants'
import { User } from 'models/user'

interface FilterBarProps {
    setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterBar = ({ setIsFilterMenuOpen }: FilterBarProps): JSX.Element => {

    return (
        <View>
            <View style={styles.filterBarContainer}>
                <SortByIcon />
                <Pressable onPress={() => { setIsFilterMenuOpen(true) }}>
                    <FilterIcon />
                </Pressable>
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
})

export { FilterBar }