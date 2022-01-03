import React, { useState, createContext, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

export const TokenContext = createContext({})

export default TokenProvider = props => {
    const { pubGet } = useAuth()
    const [blockchains, setBlockchains] = useState([])
    const [ratesProvider, setRatesProvider] = useState({})
    // Group of buyer token id containing group of seller token id
    const [exchangeRates, setExchangeRates] = useState({})

    const getBlockchains = () => Promise.resolve()
        .then(() => pubGet('blockchains', { size: 1000 }))
        .then(blockchains => setBlockchains(blockchains))

    const getRatesProvider = () => Promise.resolve()
        .then(() => pubGet('currencyexchanges'))
        .then(exchanges => exchanges.find(exchange => exchange.name == 'BINANCE'))
        .then(exchange => setRatesProvider(exchange))

    useEffect(() => {
        getBlockchains()
        getRatesProvider()
    }, [])

    useEffect(() => {
        if(Object.keys(ratesProvider).length != 0) {
            Promise.resolve()
            .then(() => pubGet('tokens', { size: 1000 }))
            .then(tokens => 
                loadStableCoinRate(tokens)
            )
        }
    }, [ratesProvider])

    const loadStableCoinRate = tokens => Promise.all(
        tokens.map(token => load(token, { id: 1014 }))
    )

    const getStableCoinRate = token => exchangeRates[token.id] 
        ? exchangeRates[token.id][1014].current
        : token.name.includes('USD') && 1

    const load = (buyerToken, sellerToken) => Promise.resolve()
        .then(() => pubGet(
            `currencyexchanges/${ratesProvider.id}/exchangerates`,
            { buyerId: buyerToken.id, sellerId: sellerToken.id }
        ))
        .then(rates => rates.length != 0 && setExchangeRates(p => 
            ({
                ...p,
                [buyerToken.id]: p[buyerToken.id]
                ? {
                    ...p[buyerToken.id],
                    [sellerToken.id]: rates[0]
                }
                : { [sellerToken.id]: rates[0] }
            })
        ))

    return (
        <TokenContext.Provider value={{
            exchangeRates,
            getStableCoinRate,
            load,
        }}>
            {props.children}
        </TokenContext.Provider>
    )
}