import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default useExchangeBalance = () => {
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
                get(`exchangeaccounts/${account.id}`)
                    .then(accountDetail => 
                        Promise.all(
                            accountDetail.currencies.map(currency => 
                                get(`exchangeaccounts/${account.id}/balances`, { currencyId: currency.id })
                                    .then(balances => [currency, balances])
                            )
                        )
                    )
                    .then(pairs => [
                        account,
                        pairs.reduce(
                            (dict, [currency, balances]) => ({
                                ...dict,
                                [currency.id]: balances
                            }),
                            {}
                        )
                    ])
            )
        )
        .then(pairs => pairs.reduce(
            (dict, [account, currencyBalances]) => ({
                ...dict,
                [account.id]: currencyBalances
            }),
            {}
        ))

        const getTotals = (accounts, accountBalances) => Object.keys(accountBalances)
            .reduce(
                (exchangeBalances, accountId) => {
                    return ({
                        ...exchangeBalances,
                        [accounts[accountId].currencyExchange.id]: exchangeBalances[accounts[accountId].currencyExchange.id]
                        ? getCurrencyTotals(
                            exchangeBalances[accounts[accountId].currencyExchange.id],
                            accountBalances[accountId]
                        )
                        : accountBalances[accountId]
                    })
                },
                {}
            )

        const getCurrencyTotals = (exchangeBalances, currencyBalances) => Object.keys(currencyBalances)
            .reduce(
                (total, currencyId) => ({
                    ...total,
                    [currencyId]: exchangeBalances[currencyId]
                    ? getBalanceTotals(exchangeBalances[currencyId], currencyBalances[currencyId])
                    : currencyBalances[currencyId]
                }),
                exchangeBalances
            )
        
        const getBalanceTotals = (total, balances) => {
            // Find the longer and shorter list between current and accumulated.
            const longer = total.length >= balances.length ? total : balances
            const shorter = total.length < balances.length ? balances : total

            return longer.map((el, i) => ({
                savings: el.savings + (shorter[i] ? shorter[i].savings : 0),
                created: el.created,
            }))
        }

    return {
        accounts,
        load,
        previewBalances,
        getTotals
    }
}