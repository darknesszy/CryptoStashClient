import React, { useState, createContext } from 'react'
import config from 'react-native-config'
import { authorize, revoke } from 'react-native-app-auth'
import { AppState, Linking } from 'react-native'

export const UserContext = createContext({})

export default UserProvider = props => {
    const [tokenStore, setTokenStore] = useState()
    const [info, setInfo] = useState()

    const authConfig = {
        issuer: config.ID_URL,
        clientId: 'cryptostashclient',
        redirectUrl: 'com.cryptostashclient.auth:/oauth',
        scopes: ['openid', 'profile', 'offline_access'],
        // dangerouslyAllowInsecureHttpRequests: true,
    }

    const signin = () => redirectToLogin()
        .then(({ accessToken }) => accessToken && getUserInfo(accessToken))

    const signout = () => Linking.openURL(`${config.ID_URL}/account/logout`)
        .then(isOpened => {
            if (isOpened) {
                const linkingSub = Linking.addEventListener('url', ({ url }) => {
                    if(url == 'com.cryptostashclient:/logout/success') {
                        console.log('Logout complete')
                        cleanup()
                    }
                })
                const appStateSub = AppState.addEventListener("change", nextAppState => {
                    if (nextAppState == 'active') {
                        appStateSub.remove()
                        linkingSub.remove()
                    }
                })
            }
        })

    const cleanup = () => revoke(authConfig, {
        tokenToRevoke: tokenStore.refreshToken,
        sendClientId: true
    })
    .then(
        res => {
            if (res.status == 200) {
                setTokenStore(null)
                setInfo(null)
                console.log('Cleanup complete')
            }
        },
        err => console.log(err)
    )

// OAuth authorisation    
// use the client to make the auth request and receive the authState
const redirectToLogin = () => authorize(authConfig)
    .then(
        tokens => {
            setTokenStore(tokens)
            return tokens
        },
        err => {
            console.log(err)
            return { accessToken: undefined }
        }
    )

const getUserInfo = accessToken => {
    fetch(`${config.ID_URL}/connect/userinfo`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(
            res => res.json(),
            err => console.log(err)
        )
        .then(
            res => setInfo(res),
            err => console.log(err)
        )
}

return (
    <UserContext.Provider value={{
        ...info,
        signin,
        signout,
        getUserInfo
    }}>
        {props.children}
    </UserContext.Provider>
)
}