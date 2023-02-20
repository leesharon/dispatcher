import { View, StyleSheet, Pressable } from "react-native"
import { TopBar } from 'components/common/TopBar'
import BackIcon from '../../../../assets/back.svg'
import { pop } from 'navigation/RootNavigation'
import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { Colors } from 'constants'
import SearchIcon from '../assets/search-large.svg'


interface TopBarSearchProps {
    searchValue: string
}

const TopBarSearch = ({ searchValue }: TopBarSearchProps): JSX.Element => {

    return (
        <TopBar styleProps={styles.topBar}>
            <View style={styles.topBarLeft}>
                <GoBackButton icon={<BackIcon />} withText={false} />
                <AppText styleProps={styles.searchValue}>{"\"" + searchValue.toUpperCase() + "\""}</AppText>
            </View>
            <Pressable onPress={pop}>
                <SearchIcon />
            </Pressable>
        </TopBar>
    )
}

const styles = StyleSheet.create({
    topBar: {
        borderWidth: 1,
        borderColor: Colors.GRAY600,
        backgroundColor: 'white',
    },
    topBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchValue: {
        paddingStart: 15,
    }
})

export { TopBarSearch }