// import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from 'components/common/AppText'
import { Colors, Fonts } from 'constants'
import Carousel from 'react-native-snap-carousel'

interface Item {
    title: string
    text: string
}

const CarouselScreen = (): JSX.Element => {

    // const [activeIndex, setActiveIndex] = useState(0)

    const carouselItems: Item[] = [
        {
            title: 'Item 1',
            text: 'Welcome to Dispatcher, the right way to read your news. Just open the app',
        },
        {
            title: 'Item 2',
            text: 'Search your fields of interest and the best part..',
        },
        {
            title: 'Item 3',
            text: 'Save all your articles for later, filter, learn and explore the lates news',
        },
    ]

    const renderItem = ({ item }: { item: Item }) => {
        return (
            <View style={styles.renderItemContainer}>
                <AppText styleProps={styles.title}>Dispatcher</AppText>
                <AppText>{item.text}</AppText>
            </View>
        )
    }


    return (
        <View style={styles.screenContainer}>
            <Carousel
                // ref={(c) => { _carousel = c }}
                data={carouselItems}
                renderItem={renderItem}
                sliderWidth={300}
                itemWidth={300}
            // layout={'tinder'}
            // onSnapToItem={(index) => setActiveIndex(index)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.BLUE800,
    },
    renderItemContainer: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontFamily: Fonts.ROBOTO_BOLD,
        color: 'white'
    }
})

export { CarouselScreen }