import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default useCurrency = () => {
    const { get } = useAuth()
    const [currencies, setCurrencies] = useState({})

    useEffect(() => {
        load()
    }, [])

    const load = () => get('currencies')
        .then(currencies => currencies.reduce((dict, currency) => ({ ...dict, [currency.id]: currency }), {}))
        .then(currencies => setCurrencies(currencies))

    return {
        currencies,
        load
    }
}