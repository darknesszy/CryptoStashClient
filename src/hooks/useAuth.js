import { useContext } from 'react'
import Config from 'react-native-config'
import { UserContext } from '../components/UserProvider'

export default useAuth = () => {
    const { token } = useContext(UserContext)

    const get = (route, ...params) => fetch(`${Config.API_URL}/${route}${new URLSearchParams(params)}`, {
        headers: { Authorization: token }
    }).then(
        res => {
            if(res.status == 200) {
                return res.json()
            } else {
                console.log(res.status, res.statusText)
                return null
            }
        },
        err => console.log(err),
    )

    return {
        get,
    }
}