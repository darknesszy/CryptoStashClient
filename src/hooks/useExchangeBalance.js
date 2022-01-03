import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default useExchangeBalance = accounts => {
    const { get } = useAuth()
    const [balances, setBalances] = useState()

    useEffect(() => {
        if(accounts && accounts.length != 0) {
            load(accounts)
        }
    }, [accounts])

    const load = accounts => Promise.all(
        accounts.map(account => 
            get(`exchangeaccounts/${account.id}`)
                .then(accountsDetail => 
                    Promise.all(
                        accountsDetail.tokens.map(token => 
                            get(`exchangeaccounts/${account.id}/balances`, { tokenId: token.id })
                                .then(balances => [token, balances])
                        )
                    )
                )
                .then(tokenBalancePairs => [
                    account,
                    tokenBalancePairs.reduce(
                        (dict, [token, balances]) => ({
                            ...dict,
                            [token.id]: balances
                        }),
                        {}
                    )
                ])
        )
    )
        .then(accountTokenPairs => accountTokenPairs.reduce(
            (dict, [account, tokens]) => ({
                ...dict,
                [account.id]: tokens
            }),
            {}
        ))
        .then(balances => setBalances(getExchangeBalances(accounts, balances)))

    const getCurrencyExchanges = accounts => accounts && accounts
        .filter(account => account.currencyExchange.id)
        .map(account => account.currencyExchange)

    const getExchangeBalances = (accounts, accountTokens) =>
        accounts.reduce(
            (exchangeTokens, account) => ({
                ...exchangeTokens,
                [account.currencyExchange.id]: Object.keys(accountTokens[account.id])
                    .reduce(
                        (acc, tokenId) => ({
                            ...acc,
                            [tokenId]: acc[tokenId] 
                                ? mergeBalances(acc[tokenId], accountTokens[account.id][tokenId][0])
                                : accountTokens[account.id][tokenId][0]
                        }),
                        exchangeTokens[account.currencyExchange.id] || {}
                    )
            }),
            {}
        )

    const mergeBalances = (source, target) => ({
        ...source,
        savings: source.savings + target.savings
    })

    return {
        balances,
        load,
        getCurrencyExchanges
    }
}