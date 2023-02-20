import { AppText } from 'components/common/AppText'
import { Heading1 } from 'components/common/Heading1'
import { MainContainer } from 'components/common/MainContainer'
import { MainTopBar } from 'components/common/MainTopBar'
import { Colors } from 'constants'
import { HeadLine } from 'models/headline'
import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { asyncStorageUtils } from 'utils/asyncStorageUtils'

const FavortiesTab = (): JSX.Element => {

    const [favoriteHeadLines, setFavoriteHeadLines] = useState<HeadLine[] | []>([])

    useEffect(() => {
        (async () => {
            const headLines = await asyncStorageUtils.getFavoriteHeadLines()
            headLines && setFavoriteHeadLines(headLines)
        })()
    }, [])

    const renderListHeader = () => {
        return (
            <View style={styles.listHeaderContainer}>
                <Heading1 >Saved Articles</Heading1>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <MainTopBar />
            <MainContainer>
                <>
                    {favoriteHeadLines && favoriteHeadLines.length > 0 &&
                        <FlatList
                            style={styles.list}
                            data={favoriteHeadLines}
                            renderItem={({ item }) => (
                                <View style={styles.headLineContainer}>
                                    <View style={{ flex: 1, paddingEnd: 8 }}>
                                        <FastImage
                                            style={styles.image}
                                            source={{ uri: item.urlToImage, priority: FastImage.priority.normal, }}
                                        />
                                    </View>
                                    <View style={{ flexGrow: 1 }}>
                                        <AppText styleProps={styles.title}>{item.title}</AppText>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                            ListHeaderComponent={renderListHeader()}
                        />
                    }
                </>
            </MainContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1
    },
    headLineContainer: {
        flexDirection: 'row',
        borderColor: Colors.GRAY600,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 4,
    },
    title: {
        lineHeight: 16
    },
    listHeaderContainer: {
    },
})

export { FavortiesTab }