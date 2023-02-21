import { Heading1 } from 'components/common/Heading1'
import { MainContainer } from 'components/common/MainContainer'
import { MainTopBar } from 'components/common/MainTopBar'
import { HeadLine } from 'models/headline'
import { StyleSheet, View, FlatList } from 'react-native'
import { FavoriteHeadLinePreview } from './FavoriteHeadLinePreview'
import { addFavoriteHeadlineId, removeFavoriteHeadlineId } from 'features/authentication/reducers/loggedinUserSlice'
import { addNotification } from 'features/notifications/reducers/notificationsSlice'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { asyncStorageUtils } from 'utils/asyncStorageUtils'
import { addFavoriteHeadLine, removeFavoriteHeadLine } from '../reducers/favoritesSlice'

const Favorites = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const favoriteHeadLines = useAppSelector(state => state.favorites.favoriteHeadLines)

    const onToggleFavorite = (headLine: HeadLine, isStarred: boolean) => {
        if (!isStarred) {
            dispatch(addFavoriteHeadlineId({ id: headLine.id }))
            dispatch(addNotification({ id: headLine.id }))
            dispatch(addFavoriteHeadLine(headLine))
            asyncStorageUtils.addFavoriteHeadLine(headLine)
        }
        else {
            dispatch(removeFavoriteHeadlineId({ id: headLine.id }))
            dispatch(removeFavoriteHeadLine(headLine.id))
            asyncStorageUtils.removeFavoriteHeadline(headLine.id)
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