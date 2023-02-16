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

const ProfileEdit = (): JSX.Element => {
    const loggedinUser = useAppSelector(selectLoggedinUser)
    console.log('ProfileEdit ~ loggedinUser', loggedinUser)
    const dispatch = useAppDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [isChangingProfilePicture, setIsChangingProfilePicture] = useState(false)
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

    const onLaunchImgLibrary = () => {
        launchImageLibrary({ mediaType: 'photo' }, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.errorCode) {
                console.log('ImagePicker Error: ', res.errorCode);
            } else {
                console.log(res)
                loggedinUser &&
                    res.assets?.length &&
                    dispatch(updateUser({ ...loggedinUser, photoURL: res.assets[0].uri || null }))
            }
        })
    }

    const onLaunchCamera = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode)
            } else {
                console.log(response)
            }
        })
    }

    if (!loggedinUser) return <View>{Strings.MUST_BE_LOGGEDIN}</View>

    return (
        <View style={styles.container}>
            {isChangingProfilePicture &&
                <>
                    <Pressable
                        style={styles.backdrop}
                        onPress={() => setIsChangingProfilePicture(false)}
                    />
                    <View style={styles.profilePictureModal}>
                        <Header1>Profile Picture</Header1>
                        <AppText styleProps={styles.uploadImgText}>{Strings.UPLOAD_PROFILE_PICTURE}</AppText>
                        <View style={styles.modalBtnsContainer}>
                            <Pressable onPress={onLaunchImgLibrary}>
                                <AppText styleProps={styles.modalBtnText}>Gallery</AppText>
                            </Pressable>
                            <Pressable onPress={onLaunchCamera}>
                                <AppText styleProps={styles.modalBtnText}>Camera</AppText>
                            </Pressable>
                        </View>
                    </View>
                </>
            }
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
                    {loggedinUser.photoURL
                        // ? <FastImage
                        //     source={{ uri: loggedinUser.photoURL, priority: FastImage.priority.normal, }}
                        //     style={{ flex: 1, width: 100, height: 100 }}
                        // />
                        ? <View style={{ flex: 1 }}><Image source={{ uri: loggedinUser.photoURL }} style={{ flex: 1 }} /></View>
                        : <UserIcon />
                    }
                    {isEditing &&
                        <Pressable onPress={() => { setIsChangingProfilePicture(true) }}>
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
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(23, 23, 23, 0.6)',
        zIndex: 4,
    },
    profilePictureModal: {
        position: 'absolute',
        top: '33%',
        left: 16,
        width: Constants.SCREEN_WIDTH - 32,
        height: '26%',
        backgroundColor: 'white',
        borderRadius: 4,
        zIndex: 5,
        paddingHorizontal: 25,
        paddingTop: 18,
        paddingBottom: 25,
    },
    uploadImgText: {
        fontSize: 16,
        maxWidth: '80%',
        lineHeight: 22,
    },
    modalBtnsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 'auto',
    },
    modalBtnText: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.BLUE350,
        marginStart: 25,
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