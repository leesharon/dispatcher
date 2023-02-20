import { MainContainer } from 'components/common/MainContainer'
import { MainTopBar } from 'components/common/MainTopBar'
import { Text, StyleSheet, View } from 'react-native'

const FavortiesTab = (): JSX.Element => {

    // const [favoriteHeadLines, ]

    return (
        <View style={styles.container}>
            <MainTopBar />
            <MainContainer>

                <Text>This is your Favorites!</Text>
            </MainContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export { FavortiesTab }