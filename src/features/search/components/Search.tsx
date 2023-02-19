import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { MainContainer } from 'components/common/MainContainer'
import { TopBar } from 'components/common/TopBar'
import { Colors, Strings } from 'constants'
import { push } from 'navigation/RootNavigation'
import { useState } from 'react'
import { View, StyleSheet, Pressable } from "react-native"
import { TextInput } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import BackIcon from '../../../../assets/back.svg'
import CancelIcon from '../assets/cancel.svg'
import { addRecentSearch, clearRecentSearches, removeRecentSearch, selectRecentSearches, sortRecentSearches } from '../reducers/searchSlice'

const Search = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState<string>('')
    const recentSearches = useAppSelector(selectRecentSearches)

    const onSubmit = () => {
        searchValue &&
            dispatch(addRecentSearch(searchValue))
        push('Homepage', { searchValue })
    }

    const onRemoveRecentSearch = (value: string) => {
        dispatch(removeRecentSearch(value))
    }

    const handleChange = (text: string) => {
        setSearchValue(text)
        dispatch(sortRecentSearches(text))
    }

    return (
        <View style={styles.screenContainer}>
            <TopBar styleProps={styles.topBar}>
                <View style={styles.topBarLeft}>
                    <GoBackButton icon={<BackIcon />} withText={false} />
                    <TextInput
                        placeholder="Search"
                        style={styles.input}
                        placeholderTextColor={Colors.BLUE400_OPACITY}
                        value={searchValue}
                        onChangeText={handleChange}
                        onSubmitEditing={onSubmit}
                    />
                </View>
                {searchValue &&
                    <Pressable onPress={() => { setSearchValue('') }}>
                        <CancelIcon />
                    </Pressable>
                }
            </TopBar>
            <MainContainer>
                <View style={styles.headerConatiner}>
                    <AppText styleProps={styles.header}>{Strings.RECENTS}</AppText>
                    {(recentSearches.length !== 0) && <Pressable
                        onPress={() => { dispatch(clearRecentSearches()) }}
                        style={styles.clearBtn}
                    >
                        <AppText isBold={true}>CLEAR</AppText>
                    </Pressable>}
                </View>
                {(recentSearches.length === 0)
                    ? <AppText styleProps={styles.noRecents}>{Strings.NO_RECENTS}</AppText>
                    : <View>
                        {recentSearches.map((item, index) => (
                            <Pressable
                                onPress={() => { push('Homepage', { searchValue: item }) }}
                                style={styles.recentsItem}
                                key={index}
                            >
                                <AppText>{item}</AppText>
                                <Pressable onPress={() => { onRemoveRecentSearch(item) }}>
                                    <CancelIcon />
                                </Pressable>
                            </Pressable>
                        ))}
                    </View>
                }
            </MainContainer >
        </View >
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.BLUE100,
    },
    topBar: {
        borderWidth: 1,
        borderColor: Colors.GRAY600,
        backgroundColor: 'white',
    },
    topBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        paddingStart: 20,
        width: '100%',
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
    noRecents: {
        alignSelf: 'center',
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