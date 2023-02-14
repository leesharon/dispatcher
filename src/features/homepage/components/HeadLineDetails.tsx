import { AppText } from 'components/common/AppText'
import { TopBar } from 'components/common/TopBar'
import { Colors } from 'constants'
import { Navigation } from 'constants/screens'
import { useEffect } from 'react'
import { View, StyleSheet, Pressable } from "react-native"
import { useAppDispatch, useAppSelector } from 'state/hooks'
import DropDownIcon from '../../../../assets/dropdown.svg'
import headLinesJSON from 'data/news-us.json'

interface HeadLineDetailsProps {
    navigation: Navigation
    route: any
}

const HeadLineDetails = ({ route: { params: { id } }, navigation }: HeadLineDetailsProps): JSX.Element => {
    console.log(id)
    // const headLine = useAppSelector((state) => state.api.queries.)
    const headLine = headLinesJSON.articles.find((article) => article.id === id)
    console.log('headLine: ', headLine)

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <TopBar>
                <Pressable
                    style={styles.iconsContainer}
                    onPress={() => navigation.pop()}
                >
                    <DropDownIcon />
                    <AppText styleProps={styles.goBack}>Back</AppText>
                </Pressable>
            </TopBar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBack: {
        color: Colors.GRAY700,
        fontSize: 16,
        marginLeft: 8,
    }
})

export { HeadLineDetails }