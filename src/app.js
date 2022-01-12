import React from 'react'
import { Platform } from 'react-native'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'
import config from 'react-native-config'
import Navigation from './navigation'
import UserProvider from './components/UserProvider'
import TokenProvider from './components/TokenProvider'

// if (Platform.OS == 'ios') {
//     PushNotification.configure({
//         onRegister: token => {
//             console.log("token: ", token)
//             const payload = {
//                 id: '1',
//                 username: 'michael',
//                 apn: token.token
//             }

//             fetch(
//                 `${config.API_URL}/Users/1`,
//                 {
//                     method: 'PUT', body: JSON.stringify(payload), headers: {
//                         'content-type': 'application/json'
//                     }
//                 }
//             ).then(res => console.log(res))
//         },
//         onNotification: notification => {
//             console.log("notification: ", notification)
//             notification.finish(PushNotificationIOS.FetchResult.NoData)
//         },
//         onAction: notification => {
//             console.log("action: ", notification.action)
//             console.log('notification: ', notification)
//         },
//         onRegistrationError: err => {
//             console.error(err.message, err)
//         },
//         permissions: {
//             alert: true,
//             badge: true,
//             sound: true
//         },
//         popInitialNotification: true,
//         requestPermissions: true
//     })


// }

export default () => {
    return (
        <UserProvider>
            <TokenProvider>
                <Navigation />
            </TokenProvider>
        </UserProvider>
    )
}