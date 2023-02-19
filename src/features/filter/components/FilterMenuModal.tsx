import { ReactNode, useState } from 'react'
import { View, StyleSheet, Pressable } from "react-native"
import Modal from "react-native-modal"
import { AppText } from 'components/common/AppText'
import { Colors, Constants, Layout } from 'constants'
import { HorizontalLine } from 'components/common/HorizontalLine'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { selectFilterBy } from '../reducers/filterSlice'
import AppButton from 'components/common/AppButton'
import BackIcon from '../../../../assets/back.svg'

interface FilterMenuModalProps {
    isVisible: boolean
    onBackdropPress: () => void
}

interface NestedModal {
    title: string
    options: string[]
}

const FilterMenuModal = ({ isVisible, onBackdropPress }: FilterMenuModalProps): JSX.Element => {

    const dispatch = useAppDispatch()
    const filterBy = useAppSelector(selectFilterBy)

    const [nestedModal, setNestedModal] = useState<NestedModal | null>(null)

    const onSubmit = () => {
        console.log(': filtered!')
    }

    const renderTitle = (title: string, icon?: ReactNode) => {
        return (
            <>
                <View style={styles.headerContainer}>
                    {icon &&
                        <Pressable onPress={() => { setNestedModal(null) }}>
                            {icon}
                        </Pressable>
                    }
                    <AppText styleProps={styles.headerText}>{title}</AppText>
                </View>
                <HorizontalLine styleProps={styles.horizontalLine} />
            </>
        )
    }

    return (
        <>
            <Modal
                isVisible={isVisible}
                onBackdropPress={onBackdropPress}
                style={styles.modal}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                backdropColor='#303032'
            >
                <View style={styles.container}>
                    {renderTitle('FILTER')}
                    {Object.keys(filterBy).map((key, index) => (
                        <Pressable
                            key={key}
                            onPress={() => setNestedModal({ title: filterBy[key].title, options: filterBy[key].options })}
                        >
                            <View style={styles.listItem}>
                                <AppText>{filterBy[key].title}</AppText>
                                <AppText styleProps={styles.listItemValue}>{filterBy[key].value}</AppText>
                            </View>
                            <HorizontalLine styleProps={styles.horizontalLine} />
                        </Pressable>
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

                {/* Nested Modal */}
                <Modal
                    isVisible={!!nestedModal}
                    style={styles.modal}
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    backdropColor='transparent'
                    onBackdropPress={() => { onBackdropPress(); setNestedModal(null) }}
                >
                    <View style={styles.container}>
                        {renderTitle(nestedModal?.title || '', <BackIcon style={{ marginEnd: 15 }} />)}
                        {nestedModal?.options.map((option, index) => (
                            <Pressable
                                key={option}
                                onPress={() => setNestedModal(null)}
                            >
                                <View style={styles.listItem}>
                                    <AppText>{option}</AppText>
                                </View>
                                <HorizontalLine styleProps={styles.horizontalLine} />
                            </Pressable>
                        ))}
                    </View>
                </Modal>
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: 25,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 22,
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