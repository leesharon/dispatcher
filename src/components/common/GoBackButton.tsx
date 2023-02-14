import { Colors } from 'constants'
import { View, Text, StyleSheet, Pressable } from "react-native"
import { AppText } from './AppText'
import DropDownIcon from '../../../assets/dropdown.svg'
import { Navigation } from 'constants/screens'

interface GoBackButtonProps {
    navigation: Navigation
}

const GoBackButton = ({ navigation }: GoBackButtonProps): JSX.Element => {

    return (
        <Pressable
            style={styles.iconsContainer}
            onPress={() => navigation.pop()}
        >
            <DropDownIcon />
            <AppText styleProps={styles.goBack}>Back</AppText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBack: {
        color: Colors.GRAY700,
        fontSize: 16,
        marginLeft: 8,
    },
})

export { GoBackButton }