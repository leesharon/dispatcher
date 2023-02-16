import { useState } from 'react'
import { View, StyleSheet, Pressable } from "react-native"
import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { Header1 } from 'components/common/Header1'
import { TopBar } from 'components/common/TopBar'
import { Colors, Layout, Strings } from 'constants'
import UserIcon from '../assets/user-large.svg'
import { AppInput, ContentType } from 'components/common/AppInput'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { selectLoggedinUser, updateUser } from 'features/authentication/reducers/loggedinUserSlice'
import { validateEmail } from 'utils/validationUtils'
import CancelIcon from '../assets/cancel.svg'
import ApproveIcon from '../assets/approve.svg'
import { showAlertMessage, showErrorMessage } from 'utils/userMsgsUtils'

interface ProfileEditProps {
}

const ProfileEdit = ({ }: ProfileEditProps): JSX.Element => {
    const loggedinUser = useAppSelector(selectLoggedinUser)
    const dispatch = useAppDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [name, setName] = useState(loggedinUser?.displayName || '')
    const [email, setEmail] = useState(loggedinUser?.email || Strings.EMAIL_EXAMPLE)

    const onApprove = () => {
        if (emailError)
            showAlertMessage(Strings.OH_OH, emailError)
        else {
            loggedinUser && dispatch(updateUser({ ...loggedinUser, displayName: name, email }))
            setIsEditing(false)
        }
    }

    const onCancel = () => {
        setIsEditing(false)
        setEmail(loggedinUser?.email || Strings.EMAIL_EXAMPLE)
        setName(loggedinUser?.displayName || '')
    }

    const onChangeProfilePicture = () => {

    }

    if (!loggedinUser) return <View>{Strings.MUST_BE_LOGGEDIN}</View>

    return (
        <View style={styles.container}>
            <TopBar>
                {!isEditing
                    ? <GoBackButton />
                    : <View style={styles.buttonsContainer}>
                        <Pressable onPress={onCancel}>
                            <CancelIcon style={styles.btn} />
                        </Pressable>
                        <Pressable onPress={onApprove}>
                            <ApproveIcon style={styles.btn} />
                        </Pressable>
                    </View>
                }
            </TopBar>
            <View style={styles.contentContainer}>
                {!isEditing
                    ? <View style={styles.headerContainer}>
                        <Header1>My Profile</Header1>
                        <Pressable
                            onPress={() => setIsEditing(true)}
                            style={styles.editBtn}
                        >
                            <AppText styleProps={styles.btnText}>Edit profile</AppText>
                        </Pressable>
                    </View>
                    : <View style={styles.hiddenView} />
                }
                <View style={styles.imgContainer}>
                    <UserIcon />
                    {isEditing &&
                        <Pressable onPress={onChangeProfilePicture}>
                            <AppText styleProps={styles.editImgText}>
                                {Strings.EDIT_PROFILE_PICTURE}
                            </AppText>
                        </Pressable>
                    }
                </View>
                <AppText styleProps={styles.inputText}>Name</AppText>
                <AppInput
                    value={name}
                    setValue={setName}
                    placeholderText={Strings.NAME_PLACEHOLDER}
                    contentType={ContentType.TEXT}
                    styleProps={styles.input}
                    isEditable={isEditing}
                />
                <AppText styleProps={styles.inputText}>Email</AppText>
                <AppInput
                    value={email}
                    setValue={setEmail}
                    placeholderText={Strings.EMAIL_PLACEHOLDER}
                    contentType={ContentType.EMAIL}
                    validate={validateEmail}
                    error={emailError}
                    setError={setEmailError}
                    isEditable={isEditing}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        marginHorizontal: 14
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
    hiddenView: {
        height: 80,
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
    editImgText: {
        paddingTop: 10,
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