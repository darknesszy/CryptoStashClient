import { useEffect, useState } from 'react'
import useAuth from './useAuth'

export default useWalletBalance = wallets => {
    const { get } = useAuth()
    const [balances, setBalances] = useState()

    useEffect(() => {
        if(wallets && wallets.length != 0) {
            load(wallets)
        }
    }, [wallets])

    const load = wallets => Promise.all(
        wallets.map(wallet => 
            get(`wallets/${wallet.id}`)
                .then(walletDetails => 
                    Promise.all(
                        walletDetails.tokens.map(token => 
                            get(`wallets/${wallet.id}/balances`, { tokenId: token.id })
                                .then(balances => [token, balances])
                        )
                    )
                )
                .then(pairs => [
                    wallet,
                    pairs.reduce(
                        (dict, [token, balances]) => ({
                            ...dict,
                            [token.id]: balances
                        }),
                        {}
                    )
                ])
        )
    )
        .then(pairs => pairs.reduce(
            (dict, [account, tokenBalances]) => ({
                ...dict,
                [account.id]: tokenBalances
            }),
            {}
        ))
        .then(balances => setBalances(getTokenTotals(balances)))

    const getTokenTotals = walletTokens => Object.keys(walletTokens)
        .reduce(
            (tokenBalances, walletId) => ({
                ...tokenBalances,
                [walletId]: Object.keys(walletTokens[walletId])
                    .reduce(
                        (acc, tokenId) =>
                            ({
                                ...acc,
                                [tokenId]: walletTokens[walletId][tokenId][0]
                            }),
                            {}
                    )
            }),
            {}
        )

    return {
        balances,
        load,
        getTokenTotals
    }
}