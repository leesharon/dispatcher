import { Pressable, StyleSheet, View } from "react-native"
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
    loggedinUser: FirebaseAuthTypes.User
}

const headLinesFromJSON = headLinesJSON.articles.map((article) => ({
    ...article,
    id: Math.random().toString(36).substring(2, 13)
}))

const HomePageScreen = ({ loggedinUser }: HomePageScreenProps): JSX.Element => {
    const [headLines, setHeadLines] = useState<HeadLine[] | null>(null)
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

    // const { data, isLoading, isSuccess, isError, error } = useGetHeadLinesQuery(null)
    // const headLines = data?.articles

    useEffect(() => {
        if (__DEV__) {
            const headLinesFromJSON = headLinesJSON.articles.map((article) => ({
                ...article,
                id: Math.random().toString(36).substring(2, 13)
            }))
            setHeadLines(headLinesFromJSON as HeadLine[])
        }
    }, [])

    return (
        <SafeAreaView style={styles.rootContainer}>
            {isFilterMenuOpen &&
                <Pressable
                    style={styles.backdrop}
                    onPress={() => { setIsFilterMenuOpen(false) }}>
                </Pressable>
            }
            <TopBar />
            <FilterBar
                loggedinUser={loggedinUser}
                setIsFilterMenuOpen={setIsFilterMenuOpen}
            />
            {headLines && <HeadLinesFeed headLines={headLines} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        flexGrow: 1,
        position: 'relative',
        paddingBottom: 200
    },
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 5
    }
})

export { HomePageScreen }