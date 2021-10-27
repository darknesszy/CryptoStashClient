import React, { useState, createContext } from 'react'
import config from 'react-native-config'
import { authorize, revoke } from 'react-native-app-auth'
import { Linking } from 'react-native'

export const UserContext = createContext({})

export default UserProvider = props => {
    const [tokenStore, setTokenStore] = useState()
    const [info, setInfo] = useState()

    const authConfig = {
        issuer: config.ID_URL,
        clientId: 'cryptostashclient',
        redirectUrl: 'com.cryptostashclient:/oauth',
        scopes: ['openid', 'profile'],
        // dangerouslyAllowInsecureHttpRequests: true,
    }

    const signin = () => redirectToLogin()
        .then(({ accessToken }) => accessToken && getUserInfo(accessToken))

    const signout = () => {
        return Linking.openURL(`${config.ID_URL}/account/logout`)
        .then(() => {
            setTokenStore(null)
            setInfo(null)
        })

        // Unused because revoke doesn't get rid of cookie in the signin browser.
        return revoke(authConfig, {
            tokenToRevoke: tokenStore.idToken,
            sendClientId: true
        }).then(
            res => console.log(res),
            err => console.log(err)
        ).then(() => {
            setTokenStore(null)
            setInfo(null)
        })
    }

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