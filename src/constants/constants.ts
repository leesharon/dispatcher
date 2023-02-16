import { Dimensions, Platform, StatusBar } from 'react-native'

const window = Dimensions.get('window')
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 60 : 0

const SCREEN_HEIGHT = window.height
const SCREEN_WIDTH = window.width
const IS_IOS = Platform.OS === 'ios'
const SCREEN_HEIGHT_WITHOUT_STATUS_BAR = window.height - (STATUS_BAR_HEIGHT || 0)

export { SCREEN_HEIGHT, SCREEN_WIDTH, IS_IOS, SCREEN_HEIGHT_WITHOUT_STATUS_BAR, STATUS_BAR_HEIGHT }