import { AppText } from 'components/common/AppText'
import { Colors } from 'constants'
import { HeadLine } from 'models/headline'
import { View, StyleSheet, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'

interface FavoriteHeadLinePreviewProps {
    headLine: HeadLine
}

const FavoriteHeadLinePreview = ({ headLine }: FavoriteHeadLinePreviewProps): JSX.Element => {

    return (
        <Pressable style={styles.headLineContainer}>
            <View style={styles.imageContainer}>
                <FastImage
                    style={styles.image}
                    source={{ uri: headLine.urlToImage, priority: FastImage.priority.normal, }}
                />
            </View>
            <AppText styleProps={styles.title}>{headLine.title}</AppText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    headLineContainer: {
        flexDirection: 'row',
        borderColor: Colors.GRAY600,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginBottom: 10
    },
    imageContainer: {
        paddingEnd: 8
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 4,
    },
    title: {
        lineHeight: 16,
        color: Colors.BLUE1000,
        fontWeight: '500',
        paddingEnd: 120,
        paddingTop: 12,
    },
})

export { FavoriteHeadLinePreview }