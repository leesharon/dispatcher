import AppButton from 'components/common/AppButton'
import { Colors, Layout } from 'constants'
import { HeadLine } from 'models/HeadLine'
import { View, StyleSheet } from "react-native"
import FastImage from 'react-native-fast-image'
import { formatDateLong } from 'utils/dateUtils'
import FavoriteIcon from '../assets/favorite.svg'
import ArrowRightIcon from '../assets/arrow-right.svg'
import { AppText } from 'components/common/AppText'

interface HeadLinePreviewProps {
    headLine: HeadLine
}

const HeadLinePreview = ({ headLine }: HeadLinePreviewProps): JSX.Element => {

    return (
        <View style={styles.headLineContainer}>
            <FavoriteIcon style={styles.favoriteIcon} />
            <FastImage
                style={styles.image}
                source={{ uri: headLine.urlToImage, priority: FastImage.priority.normal, }}
            />
            <View style={styles.headLineContent}>
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
                <AppButton
                    onPress={() => { console.log('Dispatch!!!'); }}
                    innerContainerStyle={styles.buttonInnerContainer}
                    icon={<ArrowRightIcon />}
                    iconStyle={{ position: 'absolute', right: 30 }}
                    textStyle={{ position: 'relative', right: 15 }}
                >
                    NAVIGATE TO DISPATCH
                </AppButton>
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
        marginBottom: 20,
        paddingBottom: 12,
    },
    image: {
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 10,
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
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        marginBottom: 10,
        color: Colors.BLUE1000,
    },
    content: {
        marginBottom: 20,
    },
    buttonInnerContainer: {
        borderRadius: 20,
        backgroundColor: Colors.BLUE500
    },
})

export { HeadLinePreview }