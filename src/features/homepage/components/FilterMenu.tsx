import { AppText } from 'components/common/AppText'
import { AnimatedSlideView } from 'components/common/AnimatedSlideView'
import { View, StyleSheet, Pressable, Animated } from "react-native"
import { Constants, Layout } from 'constants'
import { HorizontalLine } from 'components/common/HorizontalLine'

interface FilterMenuProps {
    setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
}

const FilterMenu = ({ setIsFilterMenuOpen, isOpen }: FilterMenuProps): JSX.Element => {

    return (
        <AnimatedSlideView
            styleProps={styles.container}
        >
            <View>
                <View style={styles.titleContainer}>
                    <AppText styleProps={styles.title}>FILTER</AppText>
                </View>
                <HorizontalLine />
            </View>
        </AnimatedSlideView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'white',
        width: '80%',
        height: Constants.SCREEN_HEIGHT_WITHOUT_STATUS_BAR - 40,
        bottom: 0,
        right: 0,
        zIndex: 10,
    },
    titleContainer: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: 25,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    toggleButton: {
        padding: 10,
        backgroundColor: 'lightgray',
        alignSelf: 'center',
    },
    filterContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 500,
        backgroundColor: 'black',
        padding: 10,
        flex: 1
    },
})

export { FilterMenu }