import { useState } from 'react'
import useAuth from './useAuth'

export default useCoin = () => {
    const { get } = useAuth()
    const [coins, setCoins] = useState()

    const getCoins = () => get('coins')
        .then(coins => coins.reduce((acc, coin) => ({ ...acc, [coin.ticker]: coin }), {}))
        .then(res => {
            setCoins(res)
            return res
        })

    return {
        coins,
        getCoins
    }
}