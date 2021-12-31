import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default useToken = () => {
    const { get } = useAuth()
    const [tokens, setTokens] = useState({})

    useEffect(() => {
        load()
    }, [])

    const load = () => get('tokens')
        .then(tokens => tokens.reduce((dict, token) => ({ ...dict, [token.id]: token }), {}))
        .then(tokens => setTokens(tokens))

    return {
        tokens,
        load
    }
}