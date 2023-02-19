import { Colors } from 'constants'
import { StyleSheet, Pressable } from "react-native"
import { AppText } from './AppText'
import DropDownIcon from '../../../assets/dropdown.svg'
import { pop } from 'navigation/RootNavigation'

interface GoBackButtonProps {
    icon?: JSX.Element
    withText?: boolean
}

const GoBackButton = ({ icon, withText = true }: GoBackButtonProps): JSX.Element => {

    return (
        <Pressable
            style={styles.iconsContainer}
            onPress={pop}
        >
            {icon || <DropDownIcon />}
            {withText && <AppText styleProps={styles.goBack}>Back</AppText>}
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
        marginStart: 8,
    },
})

export { GoBackButton }