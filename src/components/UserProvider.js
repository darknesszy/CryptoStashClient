import React, { useState, createContext, useEffect } from 'react'
import config from 'react-native-config'
import { authorize, refresh, revoke } from 'react-native-app-auth'
import Keychain from 'react-native-keychain'
import { AppState, Linking } from 'react-native'

export const UserContext = createContext({})
let isRefreshing = false

export default UserProvider = props => {
    const [info, setInfo] = useState()

    const authConfig = {
        issuer: config.ID_URL,
        clientId: 'cryptostashclient',
        redirectUrl: 'com.cryptostashclient.auth:/oauth',
        scopes: ['offline_access', 'openid', 'profile', 'finance.read', 'mining.read', 'finance.write', 'mining.write'],
        // dangerouslyAllowInsecureHttpRequests: true,
    }

    useEffect(() => {
        console.log('User provider initialised, getting exisiting credentials...')
        Keychain.getInternetCredentials(config.ID_URL)
            .then(res => res && getUserInfo(res.username))
    }, [])

    const signin = () => Promise.resolve()
        .then(() => redirectToLogin())
        .then(({ accessToken }) => accessToken && getUserInfo(accessToken))

    const signout = () => Linking.openURL(`${config.ID_URL}/account/logout`)
        .then(isOpened => {
            if (isOpened) {
                const linkingSub = Linking.addEventListener('url', ({ url }) => {
                    if(url == 'com.cryptostashclient:/logout/success') {
                        console.log('sign out complete')
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

    const cleanup = () => Promise.resolve()
        .then(() => Keychain.getInternetCredentials(config.ID_URL))
        .then(res => 
            res && revoke(
                authConfig,
                {
                    tokenToRevoke: res.password,
                    sendClientId: true
                }
            )
            .then(
                res => {
                    if (res.status == 200) {
                        Keychain.resetInternetCredentials(config.ID_URL)
                        setInfo(null)
                        console.log('Cleanup complete')
                    }
                },
                err => console.log(err)
            )
        )


    // OAuth authorisation    
    // use the client to make the auth request and receive the authState
    const redirectToLogin = () => authorize(authConfig)
        .then(
            tokens => {
                Keychain.setInternetCredentials(
                    config.ID_URL,
                    tokens['accessToken'],
                    tokens['refreshToken'],
                )
                console.log('sign in successful!')
                return tokens
            },
            err => console.log(err)
        )

    const refreshToken = () => new Promise((resolve, reject) => {
        if(isRefreshing) {
            reject()
        } else {
            isRefreshing = true
            console.log('@REFRESH TOKEN HAS EXPIRED')
            resolve()
        }
    })
        .then(() => Keychain.getInternetCredentials(config.ID_URL))
        .then(res => res
            ? Promise.resolve()
                .then(() => refresh(authConfig, { refreshToken: res.password }))
                .then(
                    tokens => {
                        console.log('@REFRESH', tokens)
                        Keychain.setInternetCredentials(
                            config.ID_URL,
                            tokens['accessToken'],
                            tokens['refreshToken'],
                        )
                        console.log('token refreshed successfully!')
                        return tokens
                    },
                    err => {
                        console.log('ERROR @REFRESH', err)
                        return cleanup()
                    }
                )
            : redirectToLogin()
        )

    const getUserInfo = accessToken => Promise.resolve()
        .then(() => fetch(
            `${config.ID_URL}/connect/userinfo`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ))
        .then(
            res => {
                if(res.status == 200) {
                    return res.json()
                } else if(res.status == 401) {
                    return refreshToken()
                } else {
                    console.log(res.status || 'get user info failed', ' user info')
                    throw 'cancel'
                }
            },
            err => console.log(err)
        )
        .then(res => {
            console.log('User information gathered')
            return setInfo(res)
        })


    return (
        <UserContext.Provider value={{
            ...info,
            signin,
            signout,
            refreshToken,
            getToken: () => Keychain.getInternetCredentials(config.ID_URL)
                .then(res => res && res.username),
            getUserInfo
        }}>
            {props.children}
        </UserContext.Provider>
    )
}