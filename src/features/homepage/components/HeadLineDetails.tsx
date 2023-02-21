import { AppText } from 'components/common/AppText'
import { TopBar } from 'components/common/TopBar'
import { Colors, Strings } from 'constants'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeadLinePreview } from './HeadLinePreview'
import { useGetHeadLinesQuery } from 'features/api/apiSlice'
import { GoBackButton } from 'components/common/GoBackButton'
import { ScrollView } from 'react-native-gesture-handler'
import type { StackScreenProps } from '@react-navigation/stack'
import { HomepageStackParamList } from 'constants/screens'
import { HeadLine } from 'models/headline'
import { useAppSelector } from 'state/hooks'

type Props = StackScreenProps<HomepageStackParamList, 'HeadlineDetails'>

const HeadLineDetails = ({ route: { params: { id } } }: Props): JSX.Element => {
    const favoriteHeadLines = useAppSelector(state => state.favorites.favoriteHeadLines)
    const { data: headLines } = useGetHeadLinesQuery()

    let headLine: HeadLine | undefined
    headLine = headLines?.find((article) => article.id === id)
    if (!headLine) headLine = favoriteHeadLines.find((article) => article.id === id)

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
        backgroundColor: Colors.WHITE,
    },
})

export { HeadLineDetails }