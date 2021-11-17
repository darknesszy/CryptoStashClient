import { groupBy } from 'lodash'
import { useEffect, useState } from 'react'
import useAuth from './useAuth'
import useCoin from './useCoin'

export default usePool = () => {
    const { isSignedIn, get, del } = useAuth()
    const { coins, getCoins } = useCoin()
    const [fintechs, setFintechs] = useState()

    // useEffect(() => {
    //     if(isSignedIn) {
    //         fintechs || getFintechs()
    //     } else {
    //         setPools(null)
    //     }
    // }, [isSignedIn])

    // Get dictionary of accounts 
    const getAccounts = () => Promise.resolve()
        .then(() => get('accounts'))
        .then(accounts => Promise.all(
            accounts.map(account => get(`accounts/${account.id}`))
        ))
        .then(accounts => accounts
            .reduce((acc, account) => ({ ...acc, [account.provider.name]: account }), {})
        )

    // Fetch wallet list and pool balance list.
    const getFintechs = () => Promise.all([
        Promise.resolve(wallets || getWallets()),
        getAccounts()
    ])
        .then(([wallets, accounts]) => 
            groupBy(
                accounts.map(poolBalance => 
                    ({ ...poolBalance, ticker: wallets[poolBalance.address].coin.ticker })
                ),
                el => el.miningPool.id
            )
        )
        .then(res => {
            setPools(res)
            return res
        })

    const removeAccount = (id) => Promise.resolve()
        .then(() => del(`poolbalances/${id}`))

    return {
        pools,
        getPools,
        removeAccount
    }
}