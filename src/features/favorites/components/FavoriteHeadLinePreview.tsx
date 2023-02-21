import { AppText } from 'components/common/AppText'
import { Colors } from 'constants'
import { HeadLine } from 'models/headline'
import { push } from 'navigation/RootNavigation'
import { View, StyleSheet, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'

import FavoriteIcon from '../../../../assets/favorite.svg'
import FavoriteStarredIcon from '../../../../assets/favorite-starred.svg'
import { useMemo } from 'react'
import { useAppSelector } from 'state/hooks'
import { selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'


interface FavoriteHeadLinePreviewProps {
    headLine: HeadLine
    onToggleFavorite: (headLine: HeadLine, isStarred: boolean) => void
}

const FavoriteHeadLinePreview = ({ headLine, onToggleFavorite }: FavoriteHeadLinePreviewProps): JSX.Element => {

    const loggedInUser = useAppSelector(selectLoggedinUser)

    const isStarred = useMemo(
        () => loggedInUser?.favoriteHeadLineIds?.includes(headLine.id),
        [loggedInUser?.favoriteHeadLineIds, headLine.id]
    )

    return (
        <Pressable
            style={styles.headLineContainer}
            onPress={() => { push('HeadlineDetails', { id: headLine.id }) }}
        >
            <Pressable style={styles.favoriteIcon} onPress={() => { onToggleFavorite(headLine, isStarred || false) }}>
                {isStarred ? <FavoriteStarredIcon /> : <FavoriteIcon />}
            </Pressable>
            <View style={styles.imageContainer}>
                <FastImage
                    style={styles.image}
                    source={{ uri: headLine.urlToImage, priority: FastImage.priority.normal, }}
                />
            </View>
            <AppText styleProps={styles.title}>{headLine.title}</AppText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    headLineContainer: {
        flexDirection: 'row',
        borderColor: Colors.GRAY600,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginBottom: 10
    },
    favoriteIcon: {
        position: 'absolute',
        top: 16,
        start: 16,
        zIndex: 1,
    },
    imageContainer: {
        paddingEnd: 8
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 4,
    },
    title: {
        lineHeight: 16,
        color: Colors.BLUE1000,
        fontWeight: '500',
        paddingEnd: 120,
        paddingTop: 12,
    },
})

export { FavoriteHeadLinePreview }