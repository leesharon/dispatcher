import { Colors, Layout } from 'constants'
import { HeadLine } from 'models/HeadLine'
import { View, Text, StyleSheet, FlatList } from "react-native"
import { HeadLinePreview } from './HeadLinePreview'

interface HeadLinesFeedProps {
    headLines: HeadLine[]
}

const HeadLinesFeed = ({ headLines }: HeadLinesFeedProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Top Headlines in Israel
            </Text>
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
        fontFamily: 'Roboto-Regular',
        fontWeight: '500',
        paddingTop: 12,
        paddingBottom: 20,
    }
})

export { HeadLinesFeed }