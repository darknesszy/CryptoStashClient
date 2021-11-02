import { useContext, useEffect, useState } from 'react'
import Config from 'react-native-config'
import { UserContext } from '../components/UserProvider'

export default useAuth = () => {
    const { getToken, refreshToken, sub } = useContext(UserContext)
    const [isSignedIn, setIsSignedIn] = useState()

    useEffect(() => {
        setIsSignedIn(sub != null)
    }, [sub])

    const pubGet = (route, ...params) => fetch(`${Config.API_URL}/${route}${new URLSearchParams(params)}`)
        .then(
            res => {
                if(res.status == 200) {
                    return res.json()
                } else {
                    console.log(res.status || 'fetch failed')
                    throw 'cancel'
                }
            },
            err => console.log(err),
        )

    const get = (route, ...params) => Promise.resolve()
        .then(() => getToken())
        .then(accessToken => accessToken 
            && fetch(
                `${Config.API_URL}/${route}${new URLSearchParams(params)}`, 
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )
        )
        .then(
            res => {
                if(res.status == 200) {
                    return res.json()
                } else if(res.status == 401) {
                    return refreshToken()
                } else {
                    console.log(res.status || 'fetch failed')
                    throw 'cancel'
                }
            },
            err => console.log(err),
        )

    const del = (route, ...params) => Promise.resolve()
        .then(() => getToken())
        .then(accessToken => accessToken 
            && fetch(
                `${Config.API_URL}/${route}${new URLSearchParams(params)}`, 
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )
        )
        .then(
            res => {
                if(res.status == 200) {
                    return res.json()
                } else if(res.status == 401) {
                    return refreshToken()
                } else {
                    console.log(res.status || 'fetch failed')
                    throw 'cancel'
                }
            },
            err => console.log(err),
        )

    return {
        isSignedIn,
        get,
        del,
        pubGet
    }
}