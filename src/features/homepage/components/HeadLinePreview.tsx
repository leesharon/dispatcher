import AppButton from 'components/common/AppButton'
import { Colors, Layout } from 'constants'
import { HeadLine } from 'models/HeadLine'
import { View, Text, StyleSheet, Image } from "react-native"
import { formatDateLong } from 'utils/dateUtils'
import FavoriteIcon from '../assets/favorite.svg'
import ArrowRightIcon from '../assets/arrow-right.svg'

interface HeadLinePreviewProps {
    headLine: HeadLine
}

const HeadLinePreview = ({ headLine }: HeadLinePreviewProps): JSX.Element => {

    return (
        <View style={styles.headLineContainer}>
            <FavoriteIcon style={styles.favoriteIcon} />
            <Image
                style={styles.image}
                source={{ uri: headLine.urlToImage }}
                resizeMode='cover'
            />
            <View style={styles.headLineContent}>
                <View style={styles.infoLine}>
                    <Text style={styles.lightText}>{formatDateLong(headLine.publishedAt)}</Text>
                </View>
                <Text style={styles.title}>{headLine.title}</Text>
                <Text style={styles.lightText}>
                    {headLine.author && headLine.author + ', '}
                    {headLine.source.name}
                </Text>
                <Text style={styles.content}>
                    {headLine.content && headLine.content.substring(0, headLine.content.length - 13)}
                </Text>
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
        fontSize: 14,
        color: Colors.BLUE400,
        opacity: 0.5,
        fontFamily: 'Roboto-Regular',
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
        fontSize: 14,
        color: Colors.BLUE400,
        fontFamily: 'Roboto-Regular',
    },
    buttonInnerContainer: {
        borderRadius: 20,
        backgroundColor: Colors.BLUE500
    },
})

export { HeadLinePreview }