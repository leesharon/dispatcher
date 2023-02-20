import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { navigate, push, resetTo } from 'navigation/RootNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetHeadLinesQuery } from 'features/api/apiSlice'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'
import { selectNotifications } from 'features/notifications/reducers/notificationsSlice'
import { selectFilterBy, updateSources } from 'features/filter/reducers/filterSlice'

import { HeadLinesFeed } from './HeadLinesFeed'
import { AppText } from 'components/common/AppText'
import { Colors, Strings } from 'constants'
import { TopBar } from '../../../components/common/TopBar'
import { FilterBar } from './FilterBar'
import { Loader } from 'components/common/Loader'
import { HomepageStackParamList } from 'constants/screens'
import { TopBarSearch } from './TopBarSearch'
import { FilterMenuModal } from 'features/filter/components/FilterMenuModal'
import { getFilteredHeadlines, getSourcesFromHeadlines } from 'utils/filterUtils'

import Logo from '../assets/logo.svg'
import SearchIcon from '../assets/search.svg'
import RedDotIcon from '../assets/red-dot.svg'
import NotificationsIcon from '../assets/notifications.svg'
import NoResultsIcon from '../assets/no-search-results.svg'

type HomepageProps = StackScreenProps<HomepageStackParamList, 'Homepage'>

const Homepage = ({ route: { params } }: HomepageProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const loggedinUser = useAppSelector(selectLoggedinUser)
    const notifications = useAppSelector(selectNotifications)
    const filterBy = useAppSelector(selectFilterBy)

    const { data: headLines, isLoading, isSuccess } = useGetHeadLinesQuery()

    const [headLinesToDisplay, setHeadLinesToDisplay] = useState(headLines)
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

    const isUnreadNotifications = useMemo(() => {
        if (!notifications.length) return false
        return notifications.some(notification => notification.isUnread)
    }, [notifications])

    // handles success api call
    useEffect(() => {
        if (isSuccess) {
            setHeadLinesToDisplay(headLines)
            dispatch(updateSources(getSourcesFromHeadlines(headLines)))
        }
    }, [isSuccess])

    // handles search results from params
    useEffect(() => {
        if (params?.searchValue && headLinesToDisplay) {
            setHeadLinesToDisplay(
                headLinesToDisplay.filter(
                    headLine => headLine.title.toLowerCase().includes(params.searchValue.toLowerCase())
                )
            )
        }
    }, [params])

    // handles filter results
    useEffect(() => {
        if (!headLines) return
        if (filterBy.sources.value === 'All' && filterBy.dates.value === 'All')
            setHeadLinesToDisplay(headLines)
        else if (filterBy.sources.value !== 'All' || filterBy.dates.value !== 'All') {
            setHeadLinesToDisplay(getFilteredHeadlines(headLines, filterBy))
        }
    }, [filterBy, headLines])

    if (!loggedinUser) resetTo('Logister')
    if (!loggedinUser) return <AppText>{Strings.MUST_BE_LOGGEDIN}</AppText>
    if (isLoading) return <Loader />
    if (!headLinesToDisplay) return <AppText>{Strings.GENERAL_ERROR}</AppText>

    return (
        <SafeAreaView style={styles.rootContainer}>
            <FilterMenuModal
                isVisible={isFilterMenuOpen}
                onBackdropPress={() => { setIsFilterMenuOpen(false) }}
            />
            {params?.searchValue
                ? <TopBarSearch searchValue={params.searchValue} />
                : <TopBar>
                    <Logo />
                    <View style={styles.iconsContainer}>
                        <Pressable
                            style={styles.iconContainer}
                            onPress={() => { push('Search') }}
                        >
                            <SearchIcon />
                        </Pressable>
                        <View>
                            <Pressable onPress={() => { navigate('Notifications') }}>
                                <NotificationsIcon />
                            </Pressable>
                            <View style={styles.redDotContainer}>
                                {isUnreadNotifications && <RedDotIcon />}
                            </View>
                        </View>
                    </View>
                </TopBar>
            }
            <FilterBar setIsFilterMenuOpen={setIsFilterMenuOpen} />
            <HeadLinesFeed
                headLines={headLinesToDisplay}
                loggedinUser={loggedinUser}
                isSearch={!!params?.searchValue}
            />
            {(headLinesToDisplay.length === 0) &&
                <View style={styles.noResultsContainer}>
                    <NoResultsIcon />
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        flexGrow: 1,
        position: 'relative',
        paddingBottom: 80,
        backgroundColor: Colors.BLUE100,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginEnd: 20,
    },
    redDotContainer: {
        position: 'absolute',
        top: -3,
        end: -1,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export { Homepage }