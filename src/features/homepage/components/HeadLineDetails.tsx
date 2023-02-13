import { View, Text, StyleSheet } from "react-native"

interface HeadLineDetailsProps {
    route: any
}

const HeadLineDetails = ({ route: { params: { id } } }: HeadLineDetailsProps): JSX.Element => {
    console.log(id)

    return (
        <View style={styles.container}>
            <Text>HeadLineDetails</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})

export { HeadLineDetails }