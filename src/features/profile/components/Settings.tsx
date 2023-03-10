import { AppText } from 'components/common/AppText'
import { GoBackButton } from 'components/common/GoBackButton'
import { Heading1 } from 'components/common/Heading1'
import { HorizontalLine } from 'components/common/HorizontalLine'
import { MainContainer } from 'components/common/MainContainer'
import { TopBar } from 'components/common/TopBar'
import { Colors, Constants } from 'constants'
import { SettingsSection } from 'models/settings-section'
import { View, StyleSheet, Switch } from "react-native"

const settingsSections: SettingsSection[] = [
    {
        title: 'Search Results',
        items: [
            {
                title: 'Save Filters',
                text: 'Allow us to save filters when entering back to the app',
                element: 'switch',
                value: false
            },
            {
                title: 'Save Search Results',
                text: 'Allow us to save your search result prefrences for next search',
                element: 'switch',
                value: false
            }
        ]
    },
    {
        title: 'App Preferences',
        items: [
            {
                title: 'Notifications',
                element: 'switch',
                value: true
            },
            {
                title: 'News Language',
                element: 'select',
                value: false
            }
        ]
    },
]

const Settings = (): JSX.Element => {

    return (
        <View style={styles.container}>
            <TopBar>
                <GoBackButton />
            </TopBar>
            <MainContainer>
                <Heading1>Settings</Heading1>
                <View style={styles.mainContent}>
                    {settingsSections.map((section, index) => (
                        <View key={index}>
                            <AppText styleProps={styles.sectionTitle}>{section.title}</AppText>
                            <HorizontalLine styleProps={styles.horizontalLine} />
                            {section.items.map((item, index) => (
                                <View key={index} style={styles.sectionItem}>
                                    <View style={styles.itemHeader}>
                                        <AppText styleProps={styles.itemTitle}>{item.title}</AppText>
                                        {item.element === 'switch' && <Switch
                                            trackColor={{ false: Colors.GRAY700, true: Colors.BLUE600 }}
                                            thumbColor={'white'}
                                            value={item.value}
                                            style={styles.switch}
                                        />}
                                    </View>
                                    {item.text && <AppText styleProps={styles.itemText}>{item.text}</AppText>}
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </MainContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
        paddingEnd: 16,
    },
    sectionTitle: {
        fontSize: 16,
        paddingTop: 25,
        paddingBottom: 10,
        color: Colors.BLUE800
    },
    horizontalLine: {
        backgroundColor: Colors.GRAY800,
    },
    sectionItem: {
        paddingTop: 20,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10
    },
    itemTitle: {
        fontSize: 16,
        color: Colors.BLUE1000,
        fontWeight: 'bold'
    },
    itemText: {
        color: Colors.GRAY900,
        width: '70%',
        lineHeight: 30,
    },
    switch: {
        transform: Constants.IS_IOS ? [] : [{ scaleX: 1.4 }, { scaleY: 1.4 }],
    },
})

export { Settings }