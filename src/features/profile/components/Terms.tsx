import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { Heading1 } from 'components/common/Heading1'
import { TopBar } from 'components/common/TopBar'
import { Colors, Layout, Strings } from 'constants'
import { View, StyleSheet } from "react-native"

interface TermsProps {
}

const Terms = ({ }: TermsProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <TopBar>
                <GoBackButton />
            </TopBar>
            <View style={styles.contentContainer}>
                <Heading1>Terms & Privacy</Heading1>
                <AppText styleProps={styles.paragraph}>{Strings.LOREM}</AppText>
                <AppText>{Strings.LOREM}</AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        paddingVertical: Layout.PADDING_HORIZONTAL,
    },
    paragraph: {
        marginBottom: 12,
    },
})

export { Terms }