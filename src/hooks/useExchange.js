import { groupBy } from 'lodash'
import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default useExchange = () => {
    const { get, del } = useAuth()
    const [exchanges, setExchanges] = useState([])

    useEffect(() => {
        getExchanges()
    }, [])

    const getExchanges = () => Promise.resolve()
        .then(() => get('currencyexchanges'))
        .then(exchanges => {
            setExchanges(exchanges)
            return exchanges
        })

    const removeAccount = (id) => Promise.resolve()
        .then(() => del(`poolbalances/${id}`))

    return {
        exchanges,
        getExchanges,
    }
}