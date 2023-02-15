import { AppText } from 'components/common/AppText'
import { TopBar } from 'components/common/TopBar'
import { Strings } from 'constants'
import { StyleSheet } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeadLinePreview } from './HeadLinePreview'
import { useGetHeadLinesQuery } from 'features/api/apiSlice'
import { GoBackButton } from 'components/common/GoBackButton'
import { ScrollView } from 'react-native-gesture-handler'
import type { StackScreenProps } from '@react-navigation/stack'
import { HomepageStackParamList } from 'constants/screens'

type Props = StackScreenProps<HomepageStackParamList, 'HeadlineDetails'>

const HeadLineDetails = ({ route: { params: { id } } }: Props): JSX.Element => {
    const { data: headLines } = useGetHeadLinesQuery()
    const headLine = headLines?.find((article) => article.id === id)

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'top']}>
            <ScrollView>
                <TopBar>
                    <GoBackButton />
                </TopBar>
                {headLine
                    ? <HeadLinePreview
                        headLine={headLine}
                        isDetails={true} />
                    : <AppText>{Strings.GENERAL_ERROR}</AppText>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})

export { HeadLineDetails }