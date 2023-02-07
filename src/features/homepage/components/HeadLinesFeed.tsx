import { View, StyleSheet, FlatList } from "react-native"
import { Colors, Layout } from 'constants'
import { AppText } from 'components/common/AppText'
import { HeadLine } from 'models/HeadLine'
import { HeadLinePreview } from './HeadLinePreview'

interface HeadLinesFeedProps {
    headLines: HeadLine[]
}

const HeadLinesFeed = ({ headLines }: HeadLinesFeedProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <AppText styleProps={styles.title}>
                Top Headlines in Israel
            </AppText>
            <FlatList
                data={headLines}
                renderItem={({ item }) => <HeadLinePreview headLine={item} />}
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
    }
})

export { HeadLinesFeed }