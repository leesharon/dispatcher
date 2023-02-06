import { Dimensions, Platform, StatusBar } from 'react-native'

const window = Dimensions.get('window')
const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const SCREEN_HEIGHT = window.height
const SCREEN_WIDTH = window.width
const IS_IOS = Platform.OS === 'ios'
const SCREEN_HEIGHT_WITHOUT_STATUS_BAR = window.height - (statusBarHeight || 0)

export { SCREEN_HEIGHT, SCREEN_WIDTH, IS_IOS, SCREEN_HEIGHT_WITHOUT_STATUS_BAR }