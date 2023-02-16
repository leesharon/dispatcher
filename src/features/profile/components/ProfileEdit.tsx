import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { Header1 } from 'components/common/Header1'
import { TopBar } from 'components/common/TopBar'
import { View, StyleSheet } from "react-native"

interface ProfileEditProps {
}

const ProfileEdit = ({ }: ProfileEditProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <TopBar>
                <GoBackButton />
            </TopBar>
            <Header1>My Profile</Header1>
            <AppText>Edit Me PLEASESEE</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export { ProfileEdit }