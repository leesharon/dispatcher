import { View, StyleSheet, FlatList } from "react-native"
import { Colors, Layout, Strings } from 'constants'
import { AppText } from 'components/common/AppText'
import { HeadLine } from 'models/headline'
import { HeadLinePreview } from './HeadLinePreview'

interface HeadLinesFeedProps {
    headLines: HeadLine[]
}

const HeadLinesFeed = ({ headLines }: HeadLinesFeedProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <AppText styleProps={styles.title}>
                {Strings.HEADLINES_FEED_TITLE}
            </AppText>
            <FlatList
                data={headLines}
                renderItem={({ item }) => <HeadLinePreview
                    headLine={item}
                    containerStyle={styles.headLineContainer}
                    imageStyle={styles.headLineImage}
                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
    },
    title: {
        fontSize: 24,
        color: Colors.BLUE800,
        fontWeight: '500',
        paddingTop: 12,
        paddingBottom: 20,
    },
    headLineContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.GRAY600,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 32 },
        shadowOpacity: 1,
        shadowRadius: 64,
        marginBottom: Layout.MARGIN_BOTTOM_LARGE,
    },
    headLineImage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
})

export { HeadLinesFeed }