import { useState } from 'react'
import { Heading1 } from 'components/common/Heading1'
import { MainContainer } from 'components/common/MainContainer'
import { MainTopBar } from 'components/common/MainTopBar'
import { updateFavoriteHeadlineIds } from 'features/authentication/reducers/loggedinUserSlice'
import { HeadLine } from 'models/headline'
import { StyleSheet, View, FlatList } from 'react-native'
import { FavoriteHeadLinePreview } from './FavoriteHeadLinePreview'
import { addFavoriteHeadline, removeFavoriteHeadline } from 'features/authentication/reducers/loggedinUserSlice'
import { addNotification } from 'features/notifications/reducers/notificationsSlice'
import { useAppDispatch } from 'state/hooks'
import { asyncStorageUtils } from 'utils/asyncStorageUtils'
import { useFocusEffect } from '@react-navigation/native'

const Favorites = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const [favoriteHeadLines, setFavoriteHeadLines] = useState<HeadLine[] | []>([])

    useFocusEffect(() => {
        (async () => {
            const headLines = await asyncStorageUtils.getFavoriteHeadLines()
            if (headLines) {
                setFavoriteHeadLines(headLines)
                dispatch(updateFavoriteHeadlineIds(headLines.map((headLine: HeadLine) => headLine.id)))
            }
        })()
    })

    const onToggleFavorite = (headLine: HeadLine, isStarred: boolean) => {
        if (!isStarred) {
            dispatch(addFavoriteHeadline({ id: headLine.id }))
            dispatch(addNotification({ id: headLine.id }))
            asyncStorageUtils.addFavoriteHeadLine(headLine)
        }
        else {
            dispatch(removeFavoriteHeadline({ id: headLine.id }))
            asyncStorageUtils.removeFavoriteHeadline(headLine.id)
            setFavoriteHeadLines(favoriteHeadLines.filter((item: HeadLine) => item.id !== headLine.id))
        }
    }

    const renderListHeader = () => {
        return (
            <Heading1 >Saved Articles</Heading1>
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
                                <FavoriteHeadLinePreview
                                    headLine={item}
                                    onToggleFavorite={onToggleFavorite}
                                />
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
})

export { Favorites }