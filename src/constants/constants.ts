import { Dimensions, Platform, StatusBar } from 'react-native'

const window = Dimensions.get('window')
const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

export const SCREEN_HEIGHT = window.height
export const SCREEN_WIDTH = window.width
export const IS_IOS = Platform.OS === 'ios'
export const SCREEN_HEIGHT_WITHOUT_STATUS_BAR = window.height - (statusBarHeight || 0)