import { useEffect } from 'react'
import { StyleSheet } from "react-native"
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopBar } from './TopBar'
import { FilterBar } from './FilterBar'
import { HeadLinesFeed } from './HeadLinesFeed'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeadLines, selectHeadLines, Status } from '../reducers/headLinesSlice'
import { AppDispatch, RootState } from 'state/store'

interface HomePageScreenProps {
    loggedinUser: FirebaseAuthTypes.User | null
}

const HomePageScreen = ({ loggedinUser }: HomePageScreenProps): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const headLinesStatus = useSelector((state: RootState) => state.headLines.status)
    const headLines = useSelector(selectHeadLines)

    useEffect(() => {
        if (headLinesStatus === Status.idle)
            dispatch(fetchHeadLines())
    }, [headLinesStatus, dispatch])

    return (
        <SafeAreaView style={styles.rootContainer}>
            <TopBar />
            <FilterBar loggedinUser={loggedinUser} />
            {headLines && <HeadLinesFeed headLines={headLines} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        flexGrow: 1,
    },
})

export { HomePageScreen }