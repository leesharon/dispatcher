import { StyleSheet } from 'react-native'
import { Colors } from 'constants'
import { AppText } from './AppText'

interface Heading1Props {
    children: string
}

const Heading1 = ({ children }: Heading1Props): JSX.Element => {

    return (
        <AppText styleProps={styles.text}>
            {children}
        </AppText>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: Colors.BLUE800,
        fontWeight: 'bold',
        paddingBottom: 12,
        paddingTop: 12
    },
})

export { Heading1 }