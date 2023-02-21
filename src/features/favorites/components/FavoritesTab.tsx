import { Heading1 } from 'components/common/Heading1'
import { MainContainer } from 'components/common/MainContainer'
import { MainTopBar } from 'components/common/MainTopBar'
import { HeadLine } from 'models/headline'
import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { asyncStorageUtils } from 'utils/asyncStorageUtils'
import { FavoriteHeadLinePreview } from './FavoriteHeadLinePreview'

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
                                <FavoriteHeadLinePreview headLine={item} />
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
    listHeaderContainer: {
    },
})

export { FavortiesTab }