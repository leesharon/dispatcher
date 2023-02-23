import AsyncStorage from '@react-native-async-storage/async-storage'
import { HeadLine } from 'models/headline'

const IS_BOARDED = 'isBoarded'
const FAVORITE_HEADLINES = 'favoriteHeadLines'

export const asyncStorageUtils = {
    isBoarding,
    addFavoriteHeadLine,
    removeFavoriteHeadline,
    getFavoriteHeadLines
}

async function addFavoriteHeadLine(headLine: HeadLine) {
    try {
        const headLines = await getFavoriteHeadLines()
        if (headLines) {
            headLines.unshift(headLine)
            _setData(FAVORITE_HEADLINES, headLines)
        } else
            _setData(FAVORITE_HEADLINES, [headLine])

    } catch (err) {
        console.log(err, 'Cannot add favorite headline')
    }
}

async function removeFavoriteHeadline(headLineId: string) {
    try {
        const headLines = await getFavoriteHeadLines()
        if (!headLines) return

        const updatedHeadLines = headLines.filter((headLine: HeadLine) => headLineId !== headLine.id)
        _setData(FAVORITE_HEADLINES, updatedHeadLines)

    } catch (err) {
        console.log(err, 'Cannot remove headline')
    }
}

async function isBoarding() {
    AsyncStorage.clear() //!! for testing
    try {
        const isBoarded = await _getData(IS_BOARDED)
        if (isBoarded) return true
        else {
            _setData(IS_BOARDED, true)
            return false
        }
    } catch (err) {
        console.log(err, 'Cannot get isBoarded')
    }
}

async function getFavoriteHeadLines() {
    try {
        return _getData(FAVORITE_HEADLINES)
    } catch (err) {
        console.log(err, 'Cannot get favorite headlines')
    }
}

async function _getData(itemName: string) {
    try {
        const jsonValue = await AsyncStorage.getItem(itemName)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (err) {
        console.log(err, 'Cannot get data')
    }
}

async function _setData(itemName: string, value: unknown) {
    try {
        await AsyncStorage.setItem(itemName, JSON.stringify(value))
    } catch (err) {
        console.log(err, 'Cannot set data')
    }
}