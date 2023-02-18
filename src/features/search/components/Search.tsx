import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { MainContainer } from 'components/common/MainContainer'
import { TopBar } from 'components/common/TopBar'
import { Colors, Strings } from 'constants'
import { useState } from 'react'
import { View, StyleSheet, Pressable } from "react-native"
import { TextInput } from 'react-native-gesture-handler'
import { Shadow } from 'react-native-shadow-2'
import BackIcon from '../assets/back.svg'
import CancelIcon from '../assets/cancel.svg'

interface SearchProps {
}

const Search = ({ }: SearchProps): JSX.Element => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [recentSearches, setRecentSearches] = useState<string[]>(['crypto', 'soccer', 'chess'])

    const onSubmit = () => {
        console.log('submit: ')

    }

    const onRemoveRecent = (item: string) => {
        setRecentSearches(recentSearches.filter((recent) => recent !== item))
    }

    return (
        <View style={styles.screenContainer}>
            <Shadow style={styles.shadowConatainer}>
                <TopBar styleProps={styles.topBar}>
                    <View style={styles.topBarLeft}>
                        <GoBackButton icon={<BackIcon />} withText={false} />
                        <TextInput
                            placeholder="Search"
                            style={styles.input}
                            placeholderTextColor={Colors.BLUE400_OPACITY}
                            value={searchValue}
                            onChangeText={setSearchValue}
                            onSubmitEditing={onSubmit}
                        />
                    </View>
                    {searchValue &&
                        <Pressable onPress={() => { setSearchValue('') }}>
                            <CancelIcon />
                        </Pressable>
                    }
                </TopBar>
            </Shadow>
            <MainContainer>
                <View style={styles.headerConatiner}>
                    <AppText styleProps={styles.header}>{Strings.RECENTS}</AppText>
                    <Pressable
                        onPress={() => { setRecentSearches([]) }}
                        style={styles.clearBtn}
                    >
                        <AppText isBold={true}>CLEAR</AppText>
                    </Pressable>
                </View>
                <View>
                    {recentSearches.map((item, index) => (
                        <Pressable
                            onPress={() => { console.log('go to ' + item) }}
                            style={styles.recentsItem}
                            key={index}
                        >
                            <AppText>{item}</AppText>
                            <Pressable onPress={() => { onRemoveRecent(item) }}>
                                <CancelIcon />
                            </Pressable>
                        </Pressable>
                    ))}
                </View>
            </MainContainer >
        </View >
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.BLUE100,
    },
    shadowConatainer: {
        width: '100%',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
            width: 0,
            height: 32,
        },
        shadowRadius: 64,
        shadowOpacity: 0.5,
    },
    topBar: {
        backgroundColor: 'white',
    },
    topBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        paddingStart: 20,
    },
    headerConatiner: {
        flexDirection: 'row',
        paddingStart: 4,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        fontWeight: '500',
        lineHeight: 22,
    },
    clearBtn: {
        backgroundColor: Colors.GRAY600,
        paddingHorizontal: 6,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recentsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 20,
        borderBottomColor: Colors.GRAY600_OPACITY,
        borderBottomWidth: 1,
    }
})

export { Search }