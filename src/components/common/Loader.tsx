import { Colors } from 'constants'
import { View, StyleSheet } from "react-native"
import LoaderSvg from '../../../assets/loader.svg'

const Loader = (): JSX.Element => {

    return (
        <View style={styles.container}>
            <LoaderSvg />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLUE800
    },
})

export { Loader }