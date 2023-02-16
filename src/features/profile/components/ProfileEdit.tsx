import { View, StyleSheet, Pressable } from "react-native"
import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { Header1 } from 'components/common/Header1'
import { TopBar } from 'components/common/TopBar'
import { Colors, Layout, Strings } from 'constants'
import UserIcon from '../assets/user-large.svg'
import { AppInput, ContentType } from 'components/common/AppInput'
import { useState } from 'react'
import { useAppSelector } from 'state/hooks'
import { selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'
import { validateEmail } from 'utils/validationUtils'

interface ProfileEditProps {
}

const ProfileEdit = ({ }: ProfileEditProps): JSX.Element => {
    const loggedinUser = useAppSelector(selectLoggedinUser)

    const [emailError, setEmailError] = useState('')

    const onEmailChange = () => {

    }

    const onNameChange = () => {

    }

    if (!loggedinUser) return <View>{Strings.MUST_BE_LOGGEDIN}</View>

    return (
        <View style={styles.container}>
            <TopBar>
                <GoBackButton />
            </TopBar>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Header1>My Profile</Header1>
                    <Pressable style={styles.editBtn}>
                        <AppText styleProps={styles.btnText}>Edit profile</AppText>
                    </Pressable>
                </View>
                <View style={styles.imgContainer}>
                    <UserIcon />
                </View>
                <AppText styleProps={styles.inputText}>Name</AppText>
                <AppInput
                    value={loggedinUser.displayName || ''}
                    setValue={onNameChange}
                    placeholderText={Strings.NAME_PLACEHOLDER}
                    contentType={ContentType.TEXT}
                    styleProps={styles.input}
                />
                <AppText styleProps={styles.inputText}>Email</AppText>
                <AppInput
                    value={loggedinUser.email || 'example@gmail.com'}
                    setValue={onEmailChange}
                    placeholderText={Strings.EMAIL_PLACEHOLDER}
                    contentType={ContentType.EMAIL}
                    validate={validateEmail}
                    error={emailError}
                    setError={setEmailError}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: Layout.PADDING_HORIZONTAL,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 40,
    },
    editBtn: {
        backgroundColor: Colors.GRAY600,
        height: 30,
        width: 74,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 12,
        fontWeight: '700',
    },
    imgContainer: {
        alignItems: 'center',
        paddingBottom: 12,
    },
    inputText: {
        paddingBottom: 5,
        paddingStart: 7,
    },
    input: {
        marginBottom: 15,
    },
})

export { ProfileEdit }