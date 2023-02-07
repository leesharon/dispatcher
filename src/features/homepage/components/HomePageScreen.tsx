import { useEffect } from 'react'
import { StyleSheet } from "react-native"
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopBar } from './TopBar'
import { FilterBar } from './FilterBar'
import { HeadLinesFeed } from './HeadLinesFeed'

interface HomePageScreenProps {
    loggedinUser: FirebaseAuthTypes.User | null
}

const HomePageScreen = ({ loggedinUser }: HomePageScreenProps): JSX.Element => {

    useEffect(() => {
    }, [])

    return (
        <SafeAreaView style={styles.rootContainer}>
            <TopBar />
            <FilterBar loggedinUser={loggedinUser} />
            <HeadLinesFeed />
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