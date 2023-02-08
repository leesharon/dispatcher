import { StyleSheet } from "react-native"
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopBar } from './TopBar'
import { FilterBar } from './FilterBar'
import { HeadLinesFeed } from './HeadLinesFeed'
import { useGetHeadLinesQuery } from 'features/api/apiSlice'
import { HeadLine } from 'models/HeadLine'
import headLinesJSON from 'data/news-us.json'
import { useEffect, useState } from 'react'

interface HomePageScreenProps {
    loggedinUser: FirebaseAuthTypes.User | null
}

const headLinesFromJSON = headLinesJSON.articles.map((article) => ({
    ...article,
    id: Math.random().toString(36).substring(2, 13)
}))

const HomePageScreen = ({ loggedinUser }: HomePageScreenProps): JSX.Element => {
    const [headLines, setHeadLines] = useState<HeadLine[] | null>(null)

    useEffect(() => {
        if (__DEV__) {
            const headLinesFromJSON = headLinesJSON.articles.map((article) => ({
                ...article,
                id: Math.random().toString(36).substring(2, 13)
            }))
            setHeadLines(headLinesFromJSON as HeadLine[])
        } else {
            const { data, isLoading, isSuccess, isError, error } = useGetHeadLinesQuery(null)
            setHeadLines(data.articles)
        }
    }, [])

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