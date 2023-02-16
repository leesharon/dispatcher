import { StyleSheet } from "react-native"
import { Colors } from 'constants'
import { AppText } from './AppText'

interface Header1Props {
    children: string
}

const Header1 = ({ children }: Header1Props): JSX.Element => {

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
        fontWeight: '500',
        paddingBottom: 12,
    },
})

export { Header1 }