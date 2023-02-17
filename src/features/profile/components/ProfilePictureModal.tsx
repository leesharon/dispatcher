import { AppText } from 'components/common/AppText'
import { Header1 } from 'components/common/Header1'
import { Colors, Constants, Strings } from 'constants'
import { View, StyleSheet, Pressable } from "react-native"

interface ProfilePictureModalProps {
    isVisible: boolean
    onDismiss: () => void
    onLaunchCamera: () => void
    onLaunchImgLibrary: () => void
}

const ProfilePictureModal = ({ isVisible, onDismiss, onLaunchCamera, onLaunchImgLibrary }: ProfilePictureModalProps): JSX.Element => {

    if (!isVisible) return <></>
    return (
        <>
            <Pressable
                style={styles.backdrop}
                onPress={onDismiss}
            />
            <View style={styles.container}>
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
    )
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(23, 23, 23, 0.6)',
        zIndex: 4,
    },
    container: {
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
})

export { ProfilePictureModal }