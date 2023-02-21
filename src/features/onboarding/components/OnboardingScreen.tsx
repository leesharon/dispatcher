import { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Bar } from 'react-native-progress'
import { AppText } from 'components/common/AppText'
import { Colors, Constants, Fonts } from 'constants'
import { resetTo } from 'navigation/RootNavigation'
import ForwardIcon from '../../../../assets/forward-white.svg'
import Rectangle1 from '../assets/rectangle1.svg'
import Rectangle2 from '../assets/rectangle2.svg'
import Rectangle3 from '../assets/rectangle3.svg'

interface Item {
    title: string
    text: string
}

const OnboardingScreen = (): JSX.Element => {
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
        if (activeIndex === carouselItems.length - 1) {
            resetTo('Logister')
            return
        }
        setActiveIndex(activeIndex + 1)
        carouselRef?.snapToNext()
    }

    const getRectangleImage = () => {
        switch (activeIndex) {
            case 0:
                return <Rectangle1 style={styles.rectangle} />
            case 1:
                return <Rectangle2 style={styles.rectangle} />
            case 2:
                return <Rectangle3 style={styles.rectangle} />
            default:
                return <Rectangle1 style={styles.rectangle} />
        }
    }

    const renderItem = ({ item }: { item: Item }) => {
        return (
            <View style={styles.carouselItemContainer}>
                <View style={styles.textContainer}>
                    <AppText styleProps={styles.title}>Dispatcher</AppText>
                    <AppText styleProps={styles.itemText}>{item.text}</AppText>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screenContainer}>
            <Bar
                progress={(activeIndex + 1) / 3}
                width={255}
                color={Colors.RED600}
                unfilledColor={Colors.BLUE150}
                borderColor={Colors.BLUE150}
                borderWidth={2}
                height={11}
                borderRadius={7}
                style={styles.bar}
            />
            <Carousel
                ref={(c) => { setCarouselRef(c) }}
                data={carouselItems}
                renderItem={renderItem}
                sliderWidth={Constants.SCREEN_WIDTH - 50}
                itemWidth={Constants.SCREEN_WIDTH - 50}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
            <View style={styles.buttonsConatainer}>
                <Pressable onPress={() => { resetTo('Logister') }}>
                    <AppText styleProps={styles.skipButton}>Skip</AppText>
                </Pressable>
                <Pressable style={styles.nextButtonContainer} onPress={handleNextButtonPress}>
                    <AppText styleProps={styles.nextButton}>Next</AppText>
                    <ForwardIcon />
                </Pressable>
            </View>
            {getRectangleImage()}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.BLUE800,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    bar: {
        alignSelf: 'center',
    },
    carouselItemContainer: {
        flex: 1,
        paddingTop: 80,
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
        marginTop: 'auto',
    },
    skipButton: {
        color: Colors.BLUE800,
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 14,
        paddingStart: 7,
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
    rectangle: {
        position: 'absolute',
        bottom: 0,
        start: 0,
        zIndex: -1,
    }
})

export { OnboardingScreen }