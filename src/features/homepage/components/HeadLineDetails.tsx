import { AppText } from 'components/common/AppText'
import { TopBar } from 'components/common/TopBar'
import { Colors, Strings } from 'constants'
import { Navigation } from 'constants/screens'
import { StyleSheet, Pressable } from "react-native"
import DropDownIcon from '../../../../assets/dropdown.svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeadLinePreview } from './HeadLinePreview'
import { useGetHeadLinesQuery } from 'features/api/apiSlice'

interface HeadLineDetailsProps {
    navigation: Navigation
    route: any
}

const HeadLineDetails = ({ route: { params: { id } }, navigation }: HeadLineDetailsProps): JSX.Element => {
    const { data: headLines } = useGetHeadLinesQuery()
    const headLine = headLines?.find((article) => article.id === id)

    return (
        <SafeAreaView style={styles.container}>
            <TopBar>
                <Pressable
                    style={styles.iconsContainer}
                    onPress={() => navigation.pop()}
                >
                    <DropDownIcon />
                    <AppText styleProps={styles.goBack}>Back</AppText>
                </Pressable>
            </TopBar>
            {headLine
                ? <HeadLinePreview
                    headLine={headLine}
                    containerStyle={styles.headLineContainer}
                    isDetails={true}
                />
                : <AppText>{Strings.GENERAL_ERROR}</AppText>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBack: {
        color: Colors.GRAY700,
        fontSize: 16,
        marginLeft: 8,
    },
    headLineContainer: {
        // flex: 1
    },
})

export { HeadLineDetails }