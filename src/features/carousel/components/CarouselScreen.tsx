import { useRef, useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { AppText } from 'components/common/AppText'
import { Colors, Constants, Fonts, Layout } from 'constants'
import Carousel from 'react-native-snap-carousel'
import ForwardIcon from '../../../../assets/forward-white.svg'
import { resetTo } from 'navigation/RootNavigation'

interface Item {
    title: string
    text: string
}

const CarouselScreen = (): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [carouselRef, setCarouselRef] = useState<Carousel<Item> | null>(null)

    const carouselItems: Item[] = [
        {
            title: 'Item 1',
            text: 'Welcome to Dispatcher,\n the right way to read your news. Just open the app',
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

    const handleNextButtonPress = () => {
        if (activeIndex === carouselItems.length - 1) resetTo('Logister')
        carouselRef?.snapToNext()
    }

    const renderItem = ({ item }: { item: Item }) => {
        return (
            <View style={styles.carouselItemContainer}>
                <View style={styles.textContainer}>
                    <AppText styleProps={styles.title}>Dispatcher</AppText>
                    <AppText styleProps={styles.itemText}>{item.text}</AppText>
                </View>
                <View style={styles.buttonsConatainer}>
                    <Pressable onPress={() => { resetTo('Logister') }}>
                        <AppText styleProps={styles.skipButton}>Skip</AppText>
                    </Pressable>
                    <Pressable style={styles.nextButtonContainer} onPress={handleNextButtonPress}>
                        <AppText styleProps={styles.nextButton}>Next</AppText>
                        <ForwardIcon />
                    </Pressable>
                </View>
            </View>
        )
    }


    return (
        <View style={styles.screenContainer}>
            <Carousel
                ref={(c) => { setCarouselRef(c) }}
                data={carouselItems}
                renderItem={renderItem}
                sliderWidth={Constants.SCREEN_WIDTH - 50}
                itemWidth={Constants.SCREEN_WIDTH - 50}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.BLUE800,
        alignItems: 'center',
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingBottom: 30,
    },
    carouselItemContainer: {
        flex: 1,
        paddingTop: 100,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: Fonts.ROBOTO_BOLD,
        color: 'white',
        paddingTop: 10,
        paddingBottom: 50,
    },
    itemText: {
        fontSize: 22,
        color: Colors.BLUE200,
        lineHeight: 26,
        textAlign: 'center',
        maxWidth: 300,
    },
    buttonsConatainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto'
    },
    skipButton: {
        color: Colors.BLUE800,
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 14,
    },
    nextButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 14,
        paddingTop: 4,
        paddingEnd: 7,
    },
})

export { CarouselScreen }