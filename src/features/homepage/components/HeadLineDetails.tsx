import { AppText } from 'components/common/AppText'
import { TopBar } from 'components/common/TopBar'
import { Colors, Strings } from 'constants'
import { Navigation } from 'constants/screens'
import { useEffect } from 'react'
import { StyleSheet, Pressable } from "react-native"
import { useAppDispatch, useAppSelector } from 'state/hooks'
import DropDownIcon from '../../../../assets/dropdown.svg'
import headLinesJSON from 'data/news-us.json'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeadLinePreview } from './HeadLinePreview'
import { HeadLine } from 'models/HeadLine'

interface HeadLineDetailsProps {
    navigation: Navigation
    route: any
}

const HeadLineDetails = ({ route: { params: { id } }, navigation }: HeadLineDetailsProps): JSX.Element => {
    console.log(id)
    // const headLine = useAppSelector((state) => state.api.queries.)
    const headLine = headLinesJSON.articles.find((article) => article.id === id) as HeadLine

    // async function fetchArticle(url: string) {
    //     const response = await axios.get(url)
    //     const html = response.data
    //     const $ = load(html)
    //     const content = $('article').html()
    //     console.log('fetchArticle ~ content', content)
    //     return content
    // }

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