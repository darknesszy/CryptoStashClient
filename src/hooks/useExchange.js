import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default useExchange = () => {
    const { get } = useAuth()
    const [accounts, setAccounts] = useState({})

    useEffect(() => {
        load()
    }, [])

    const load = () => Promise.resolve()
        .then(() => get('exchangeaccounts'))
        .then(accounts => accounts.reduce((dict, account) => ({ ...dict, [account.id]: account }), {}))
        .then(accounts => setAccounts(accounts))

    const previewBalances = accounts => Promise.all(
        Object.values(accounts).map(account => 
            get(`exchangeaccounts/${account.id}/balances`)
                .then(balances => [account, balances])
        )
    )
    .then(pairs => pairs.reduce(
        (dict, [account, balances]) => ({
            ...dict,
            [account.id]: balances[0]
        }),
        {}
    ))

    return {
        accounts,
        load,
        previewBalances
    }
}