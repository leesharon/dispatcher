import { View, StyleSheet, FlatList } from 'react-native'
import { Colors, Layout, Strings } from 'constants'
import { AppText } from 'components/common/AppText'
import { HeadLine } from 'models/headline'
import { HeadLinePreview } from './HeadLinePreview'
import { User } from 'models/user'
import { formatDate } from 'utils/dateUtils'
import { Heading1 } from 'components/common/Heading1'

interface HeadLinesFeedProps {
    headLines: HeadLine[]
    loggedinUser: User
    isSearch?: boolean
}

const HeadLinesFeed = ({ headLines, loggedinUser, isSearch }: HeadLinesFeedProps): JSX.Element => {

    return (
        <View style={styles.container}>
            <FlatList
                data={headLines}
                renderItem={({ item }) => <HeadLinePreview
                    headLine={item}
                    containerStyle={styles.headLineContainer}
                    imageStyle={styles.headLineImage}
                />}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <View style={styles.listHeaderContainer}>
                        {!isSearch &&
                            <View style={styles.lastLoginContainer}>
                                <AppText styleProps={styles.lastLoginText}>Last Login:</AppText>
                                {loggedinUser.metadata.lastSignInTime && <AppText styleProps={styles.lastLoginText}>
                                    {formatDate(loggedinUser.metadata.lastSignInTime)}
                                </AppText>}
                            </View>}
                        {(headLines.length !== 0) &&
                            <Heading1>
                                {Strings.HEADLINES_FEED_TITLE}
                            </Heading1>}
                    </View>
                }
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Layout.PADDING_HORIZONTAL,
        backgroundColor: Colors.BLUE100,
    },
    lastLoginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 12,
    },
    lastLoginText: {
        fontSize: 12,
        fontFamily: 'Roboto-Bold',
        marginEnd: 3,
    },
    headLineContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.GRAY600,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 32 },
        shadowOpacity: 1,
        shadowRadius: 64,
        marginBottom: Layout.MARGIN_BOTTOM_LARGE,
    },
    headLineImage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    listHeaderContainer: {
        paddingTop: 10,
    },
})

export { HeadLinesFeed }