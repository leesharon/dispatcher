import React, { ReactNode, useState } from "react"
import { View, StyleSheet, Pressable, FlatList } from "react-native"
import Modal from "react-native-modal"
import { AppText } from "components/common/AppText"
import { Colors, Constants, Layout } from "constants"
import { HorizontalLine } from "components/common/HorizontalLine"
import { useAppDispatch, useAppSelector } from "state/hooks"
import { selectFilterBy, updateFilterBy } from "../reducers/filterSlice"
import AppButton from "components/common/AppButton"
import BackIcon from "../../../../assets/back.svg"
import { FilterBy } from "models/filter-by"

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

    const [updatedFilterBy, setUpdatedFilterBy] = useState(filterBy)
    const [selectedCategory, setSelectedCategory] = useState<keyof FilterBy | null>(null)
    const [nestedModal, setNestedModal] = useState<NestedModal | null>(null)

    const onSubmit = () => {
        onBackdropPress()
        dispatch(updateFilterBy(updatedFilterBy))
    }

    const onSelectFilterCategory = (category: keyof FilterBy) => {
        setNestedModal({ title: updatedFilterBy[category].title, options: updatedFilterBy[category].options })
        setSelectedCategory(category)
    }

    const onSelectFilterOption = (option: string) => {
        if (!(typeof selectedCategory === "string")) return
        setNestedModal(null)
        setUpdatedFilterBy(prevState => ({
            ...prevState,
            [selectedCategory]: { ...prevState[selectedCategory], value: option }
        }))
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

    const renderModalContent = () => {
        return (
            <View style={styles.container}>
                {renderTitle("FILTER")}
                {Object.keys(updatedFilterBy).map((category, index) => (
                    <Pressable
                        key={category}
                        onPress={() => onSelectFilterCategory(category)}
                    >
                        <View style={styles.listItem}>
                            <AppText>{updatedFilterBy[category].title}</AppText>
                            <AppText styleProps={styles.listItemValue}>{updatedFilterBy[category].value}</AppText>
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
        )
    }

    const renderNestedModal = () => {
        return (
            <Modal
                isVisible={!!nestedModal}
                style={styles.modal}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                backdropColor='transparent'
                onBackdropPress={() => { onBackdropPress(); setNestedModal(null) }}
            >
                <View style={styles.container}>
                    {renderTitle(nestedModal?.title || "", <BackIcon style={styles.backIcon} />)}
                    <FlatList
                        data={nestedModal?.options}
                        keyExtractor={(option) => option}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => { onSelectFilterOption(item) }}
                            >
                                <View style={styles.listItem}>
                                    <AppText>{item}</AppText>
                                </View>
                                <HorizontalLine styleProps={styles.horizontalLine} />
                            </Pressable>
                        )}
                    />
                </View>
            </Modal>
        )
    }

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            style={styles.modal}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            backdropColor='#303032'
        >
            {renderModalContent()}
            {renderNestedModal()}
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        marginTop: Constants.STATUS_BAR_HEIGHT,
        marginBottom: 68,
        marginEnd: 0,
        marginStart: "20%",
        backgroundColor: "white",
    },
    container: {
        flex: 1,
    },
    backIcon: {
        marginEnd: 15
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: 25,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 22,
    },
    horizontalLine: {
        backgroundColor: Colors.GRAY600_OPACITY
    },
    listItem: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: Layout.PADDING_VERTICAL,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listItemValue: {
        opacity: 0.5,
    },
    buttonContainer: {
        backgroundColor: Colors.BLUE100,
        marginTop: "auto",
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