import { View, StyleSheet, Pressable } from "react-native"
import FastImage from 'react-native-fast-image'
import AppButton from 'components/common/AppButton'
import { Colors, Layout } from 'constants'
import { HeadLine } from 'models/headline'
import { formatDateLong } from 'utils/dateUtils'
import FavoriteIcon from '../assets/favorite.svg'
import FavoriteStarredIcon from '../assets/favorite-starred.svg'
import ArrowRightIcon from '../assets/arrow-right.svg'
import { AppText } from 'components/common/AppText'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { addFavoriteHeadline, removeFavoriteHeadline, selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'
import { useMemo } from 'react'
import { navigate } from 'navigation/RootNavigation'
import { addNotification } from 'features/notifications/reducers/notificationsSlice'

interface HeadLinePreviewProps {
    headLine: HeadLine
    isDetails?: boolean
    containerStyle?: {
        backgroundColor?: string
        borderRadius?: number
        borderWidth?: number
        borderColor?: string
        shadowColor?: string
        shadowOffset?: {
            width?: number
            height?: number
        }
        shadowOpacity?: number
        shadowRadius?: number
        marginBottom?: number
        paddingBottom?: number
    } | {}
    imageStyle?: {
        borderTopLeftRadius: number
        borderTopRightRadius: number
    } | {}
}

const HeadLinePreview = ({ headLine, isDetails, containerStyle = {}, imageStyle = {} }: HeadLinePreviewProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const loggedInUser = useAppSelector(selectLoggedinUser)

    const onPressDispatch = () => {
        navigate('HeadlineDetails', { id: headLine.id })
    }

    const onToggleFavorite = () => {
        if (!isStarred) {
            dispatch(addFavoriteHeadline(headLine.id))
            dispatch(addNotification(headLine.id))
        }
        else
            dispatch(removeFavoriteHeadline(headLine.id))
    }

    const isStarred = useMemo(
        () => loggedInUser?.favoriteHeadLineIds?.includes(headLine.id),
        [loggedInUser?.favoriteHeadLineIds]
    )

    return (
        <View style={[styles.headLineContainer, containerStyle]}>
            <Pressable style={styles.favoriteIcon} onPress={onToggleFavorite}>
                {isStarred ? <FavoriteStarredIcon /> : <FavoriteIcon />}
            </Pressable>
            <FastImage
                style={[styles.image, imageStyle]}
                source={{ uri: headLine.urlToImage, priority: FastImage.priority.normal, }}
            />
            <View style={styles.headLineContent}>

                <View style={styles.infoLine}>
                    <AppText styleProps={styles.lightText}>{formatDateLong(headLine.publishedAt)}</AppText>
                </View>
                <AppText styleProps={styles.title}>{headLine.title}</AppText>
                <AppText styleProps={styles.lightText}>
                    {headLine.author && headLine.author + ', ' + headLine.source.name}
                </AppText>
                <AppText styleProps={styles.content}>
                    {headLine.content &&
                        (isDetails
                            ? (headLine.content.substring(0, headLine.content.length - 13)).repeat(10)
                            : headLine.content.substring(0, headLine.content.length - 13)
                        )
                    }
                </AppText>

                {!isDetails && <AppButton
                    onPress={onPressDispatch}
                    innerContainerStyle={styles.buttonInnerContainer}
                    icon={<ArrowRightIcon />}
                    iconStyle={{ position: 'absolute', right: 30 }}
                    textStyle={{ position: 'relative', right: 15 }}
                >
                    NAVIGATE TO DISPATCH
                </AppButton>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headLineContainer: {
        backgroundColor: 'white',
        paddingBottom: 12,
        flex: 1
    },
    image: {
        height: 150,
        marginBottom: Layout.MARGIN_BOTTOM_SMALL,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
    },
    headLineContent: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
    },
    infoLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lightText: {
        opacity: 0.5,
        marginBottom: Layout.MARGIN_BOTTOM_SMALL,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        marginBottom: Layout.MARGIN_BOTTOM_SMALL,
        color: Colors.BLUE1000,
    },
    content: {
        marginBottom: Layout.MARGIN_BOTTOM_LARGE,
    },
    buttonInnerContainer: {
        borderRadius: 20,
        backgroundColor: Colors.BLUE500
    },
})

export { HeadLinePreview }