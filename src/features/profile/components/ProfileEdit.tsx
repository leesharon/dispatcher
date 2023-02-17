import { useState } from 'react'
import { View, StyleSheet, Pressable, Image } from "react-native"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { Header1 } from 'components/common/Header1'
import { TopBar } from 'components/common/TopBar'
import { Colors, Constants, Layout, Strings } from 'constants'
import UserIcon from '../assets/user-large.svg'
import { AppInput, ContentType } from 'components/common/AppInput'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { selectLoggedinUser, updateUser } from 'features/authentication/reducers/loggedinUserSlice'
import { validateEmail } from 'utils/validationUtils'
import CancelIcon from '../assets/cancel.svg'
import ApproveIcon from '../assets/approve.svg'
import { showAlertMessage } from 'utils/userMsgsUtils'
import FastImage from 'react-native-fast-image'
import { ProfilePictureModal } from './ProfilePictureModal'

const ProfileEdit = (): JSX.Element => {
    const loggedinUser = useAppSelector(selectLoggedinUser)
    const dispatch = useAppDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [isChangingProfilePicture, setIsChangingProfilePicture] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [name, setName] = useState(loggedinUser?.displayName || '')
    const [email, setEmail] = useState(loggedinUser?.email || Strings.EMAIL_EXAMPLE)
    const [profilePicture, setProfilePicture] = useState(loggedinUser?.photoURL || null)

    const onApprove = () => {
        if (emailError)
            showAlertMessage(Strings.OH_OH, emailError)
        else {
            loggedinUser && dispatch(updateUser(
                {
                    ...loggedinUser,
                    displayName: name,
                    email,
                    photoURL: profilePicture
                }
            ))
            setIsEditing(false)
        }
    }

    const onCancel = () => {
        setIsEditing(false)
        setEmail(loggedinUser?.email || Strings.EMAIL_EXAMPLE)
        setName(loggedinUser?.displayName || '')
    }

    const onLaunchImgLibrary = () => {
        launchImageLibrary({ mediaType: 'photo', maxWidth: 200, maxHeight: 200 }, (res) => {
            if (res.didCancel)
                console.log('User cancelled image picker')
            else if (res.errorCode)
                console.log('ImagePicker Error: ', res.errorCode)
            else {
                console.log(res)
                loggedinUser &&
                    res.assets?.length &&
                    setProfilePicture(res.assets[0].uri || null)
                setIsChangingProfilePicture(false)
            }
        })
    }

    const onLaunchCamera = () => {
        launchCamera({ mediaType: 'photo' }, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker')
            } else if (res.errorCode) {
                console.log('ImagePicker Error: ', res.errorCode)
            } else {
                console.log(res)
                loggedinUser &&
                    res.assets?.length &&
                    setProfilePicture(res.assets[0].uri || null)
                setIsChangingProfilePicture(false)
            }
        })
    }

    if (!loggedinUser) return <View>{Strings.MUST_BE_LOGGEDIN}</View>

    return (
        <View style={styles.container}>
            <ProfilePictureModal
                isVisible={isChangingProfilePicture}
                onDismiss={() => setIsChangingProfilePicture(false)}
                onLaunchCamera={onLaunchCamera}
                onLaunchImgLibrary={onLaunchImgLibrary}
            />
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
                <View style={styles.editImgContainer}>
                    <View style={styles.imgContainer}>
                        {profilePicture
                            ?
                            <FastImage
                                source={{ uri: profilePicture, priority: FastImage.priority.normal, }}
                                style={{ width: 100, height: 100, borderRadius: 50, }}
                            />
                            : <UserIcon />
                        }
                    </View>
                    {isEditing &&
                        <Pressable
                            onPress={() => { setIsChangingProfilePicture(true) }}
                        >
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
        </View >
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
        height: 40,
    },
    editImgContainer: {
        alignItems: 'center',
        paddingBottom: 12,
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
        justifyContent: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
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