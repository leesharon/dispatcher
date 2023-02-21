import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { resetTo } from 'navigation/RootNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetHeadLinesQuery } from 'features/api/apiSlice'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { selectLoggedinUser } from 'features/authentication/reducers/loggedinUserSlice'
import { selectFilterBy, updateSources } from 'features/filter/reducers/filterSlice'

import { HeadLinesFeed } from './HeadLinesFeed'
import { AppText } from 'components/common/AppText'
import { Colors, Strings } from 'constants'
import { FilterBar } from './FilterBar'
import { Loader } from 'components/common/Loader'
import { HomepageStackParamList } from 'constants/screens'
import { TopBarSearch } from './TopBarSearch'
import { FilterMenuModal } from 'features/filter/components/FilterMenuModal'
import { getFilteredHeadlines, getSourcesFromHeadlines } from 'utils/filterUtils'

import NoResultsIcon from '../assets/no-search-results.svg'
import { MainTopBar } from 'components/common/MainTopBar'

type HomepageProps = StackScreenProps<HomepageStackParamList, 'Homepage'>

const Homepage = ({ route: { params } }: HomepageProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const loggedinUser = useAppSelector(selectLoggedinUser)
    const filterBy = useAppSelector(selectFilterBy)

    const { data: headLines, isLoading, isSuccess } = useGetHeadLinesQuery()

    const [headLinesToDisplay, setHeadLinesToDisplay] = useState(headLines)
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

    const headLinesSources = useMemo(() => {
        if (!headLines) return []
        return getSourcesFromHeadlines(headLines)
    }, [headLines])

    // handles filter results
    useEffect(() => {
        if (!headLines || !isSuccess) return
        setHeadLinesToDisplay(getFilteredHeadlines(headLines, filterBy, params?.searchValue))
    }, [filterBy, headLines, params, isSuccess])

    // handles success api call
    useEffect(() => {
        if (isSuccess) {
            dispatch(updateSources(headLinesSources))
        }
    }, [isSuccess, dispatch, headLinesSources])

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
                : <MainTopBar />
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
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export { Homepage }