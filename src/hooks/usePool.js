import { groupBy } from 'lodash'
import { useState } from 'react'
import useAuth from './useAuth'
import useWallet from './useWallet'

export default usePool = () => {
    const { get } = useAuth()
    const { wallets, getWallets } = useWallet()
    const [pools, setPools] = useState()

    // Fetch wallet list and pool balance list.
    const getPools = () => Promise.all([
        Promise.resolve(wallets || getWallets()),
        get('poolBalances')
    ])
        .then(([wallets, poolBalances]) => 
            // Group pool balances by mining pool.
            groupBy(
                // Match coin ticker to each pool balance based on wallet address.
                poolBalances.map(poolBalance => 
                    ({ ...poolBalance, ticker: wallets[poolBalance.address].coin.ticker })
                ),
                el => el.miningPool.id
            )
        )
        .then(res => {
            setPools(res)
            return res
        })

    return {
        pools,
        getPools
    }
}