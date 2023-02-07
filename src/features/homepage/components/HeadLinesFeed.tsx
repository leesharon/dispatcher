import { Colors, Layout } from 'constants'
import { View, Text, StyleSheet } from "react-native"

interface HeadLinesFeedProps {
}

const HeadLinesFeed = ({ }: HeadLinesFeedProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Top Headlines in Israel
            </Text>
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