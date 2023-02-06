import { Alert } from 'react-native'
import { showMessage } from 'react-native-flash-message'

const showErrorMessage = (msg: string) => {
    showMessage({
        message: msg,
        type: "danger",
    })
}

const showAlertMessage = (title: string, msg: string) => {
    Alert.alert(
        title,
        msg,
        [{ text: 'Okay', style: 'destructive' }]
    )
}

export { showErrorMessage, showAlertMessage }