import { View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { AppText } from 'components/common/AppText'
import { Colors, Constants, Layout } from 'constants'
import { HorizontalLine } from 'components/common/HorizontalLine'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { selectFilterBy } from '../reducers/filterSlice'
import { FilterBy } from 'models/filter-by'
import AppButton from 'components/common/AppButton'

interface FilterMenuModalProps {
    isVisible: boolean
    onBackdropPress: () => void
}

const FilterMenuModal = ({ isVisible, onBackdropPress }: FilterMenuModalProps): JSX.Element => {

    const dispatch = useAppDispatch()
    const filterBy = useAppSelector(selectFilterBy)

    const onSubmit = () => {
        console.log(': filtered!')
    }

    return (
        <>
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
                    {Object.keys(filterBy).map((key, index) => (
                        <View>
                            <View style={styles.listItem}>
                                <AppText>{filterBy[key].title}</AppText>
                                <AppText styleProps={styles.listItemValue}>{filterBy[key].value}</AppText>
                            </View>
                            <HorizontalLine styleProps={styles.horizontalLine} />
                        </View>
                    ))}
                    <View style={styles.buttonContainer}>
                        <AppButton
                            onPress={onSubmit}
                            innerContainerStyle={styles.buttonInnerContainer}
                        >
                            View Results
                        </AppButton>
                    </View>
                </View>
            </Modal>
            <Modal>
                <View>

                </View>
            </Modal>
        </>
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
    listItem: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: Layout.PADDING_VERTICAL,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemValue: {
        opacity: 0.5,
    },
    buttonContainer: {
        backgroundColor: Colors.BLUE100,
        marginTop: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 70
    },
    buttonInnerContainer: {
        backgroundColor: Colors.BLUE500,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
    }
})

export { FilterMenuModal }