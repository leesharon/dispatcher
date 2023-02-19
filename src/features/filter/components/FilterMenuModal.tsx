import { View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { AppText } from 'components/common/AppText'
import { Colors, Constants, Layout } from 'constants'
import { HorizontalLine } from 'components/common/HorizontalLine'

interface FilterMenuModalProps {
    isVisible: boolean
    onBackdropPress: () => void
}

const FilterMenuModal = ({ isVisible, onBackdropPress }: FilterMenuModalProps): JSX.Element => {

    return (
        <Modal
            isVisible={isVisible}
            hasBackdrop={true}
            onBackdropPress={onBackdropPress}
            style={styles.modal}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            backdropColor='#303032'
        >
            <View style={styles.container}>
                <AppText styleProps={styles.header}>FILTER</AppText>
                <HorizontalLine styleProps={styles.horizontalLine} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        marginTop: Constants.STATUS_BAR_HEIGHT,
        marginBottom: 68,
        marginEnd: 0,
        marginStart: '20%',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 22,
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: 25,
    },
    horizontalLine: {
        backgroundColor: Colors.GRAY600_OPACITY
    },
})

export { FilterMenuModal }