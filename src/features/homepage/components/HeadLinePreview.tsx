import AppButton from 'components/common/AppButton'
import { Colors, Layout, Screens } from 'constants'
import { HeadLine } from 'models/HeadLine'
import { View, StyleSheet, Pressable } from "react-native"
import FastImage from 'react-native-fast-image'
import { formatDateLong } from 'utils/dateUtils'
import FavoriteIcon from '../assets/favorite.svg'
import ArrowRightIcon from '../assets/arrow-right.svg'
import { AppText } from 'components/common/AppText'
import { Navigation } from 'constants/screens'

interface HeadLinePreviewProps {
    headLine: HeadLine
    navigation?: Navigation
}

const HeadLinePreview = ({ headLine, navigation }: HeadLinePreviewProps): JSX.Element => {

    const onPressDispatch = () => {
        navigation && navigation.navigate(Screens.HOMEPAGE_STACK_NAVIGATION.HEADLINE_DETAILS, { id: headLine.id })
    }

    const renderHeader = () => (
        <>
            <FavoriteIcon style={styles.favoriteIcon} />
            <FastImage
                style={styles.image}
                source={{ uri: headLine.urlToImage, priority: FastImage.priority.normal, }}
            />
        </>
    )

    const renderContent = () => (
        <>
            <View style={styles.infoLine}>
                <AppText styleProps={styles.lightText}>{formatDateLong(headLine.publishedAt)}</AppText>
            </View>
            <AppText styleProps={styles.title}>{headLine.title}</AppText>
            <AppText styleProps={styles.lightText}>
                {headLine.author && headLine.author + ', ' + headLine.source.name}
            </AppText>
            <AppText styleProps={styles.content}>
                {headLine.content && headLine.content.substring(0, headLine.content.length - 13)}
            </AppText>
        </>
    )

    const renderButton = () => (
        <AppButton
            onPress={onPressDispatch}
            innerContainerStyle={styles.buttonInnerContainer}
            icon={<ArrowRightIcon />}
            iconStyle={{ position: 'absolute', right: 30 }}
            textStyle={{ position: 'relative', right: 15 }}
        >
            NAVIGATE TO DISPATCH
        </AppButton>
    )

    return (
        <View style={styles.headLineContainer}>
            {renderHeader()}
            <View style={styles.headLineContent}>
                {renderContent()}
                {renderButton()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headLineContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.GRAY600,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 32 },
        shadowOpacity: 1,
        shadowRadius: 64,
        marginBottom: Layout.MARGIN_BOTTOM_LARGE,
        paddingBottom: 12,
    },
    image: {
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: Layout.MARGIN_BOTTOM_SMALL,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
    },
    headLineContent: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
    },
    infoLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lightText: {
        opacity: 0.5,
        marginBottom: Layout.MARGIN_BOTTOM_SMALL,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        marginBottom: Layout.MARGIN_BOTTOM_SMALL,
        color: Colors.BLUE1000,
    },
    content: {
        marginBottom: Layout.MARGIN_BOTTOM_LARGE,
    },
    buttonInnerContainer: {
        borderRadius: 20,
        backgroundColor: Colors.BLUE500
    },
})

export { HeadLinePreview }