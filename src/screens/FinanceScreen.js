import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import config from 'react-native-config'
import styled from 'styled-components'

export default ({ navigation }) => {
    const [accounts, setAccounts] = useState([])
    const [coins, setCoins] = useState({})

    useEffect(() => {
        getList()
        fetchCoins()
    }, [])

    const getList = () => fetch(`${config.API_URL}/Accounts`)
        .then(res => res.json())
        .then(res => Promise.all(
            res.map(account => 
                fetch(`${config.API_URL}/Accounts/${account.id}`)
                    .then(res => res.json())
            )
        ))
        .then(res => setAccounts(res))

    const fetchCoins = () => fetch(`${config.API_URL}/Coins`)
        .then(res => res.json())
        .then(res => res.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}))
        .then(res => setCoins(res))

    const combinedProviders = target => Object.values(
        target.reduce((acc, cur) => ({
            ...acc,
            [cur.provider.name]: {
                ...cur,
                accountBalances: acc[cur.provider.name]
                    ? [ ...acc[cur.provider.name].accountBalances, ...cur.accountBalances ]
                    : cur.accountBalances
            }
        }), {})
    )

    const combinedCoinBalances = balances => Object.values(
        balances.reduce((acc, cur) => ({
            ...acc,
            [coins[cur.coinId].ticker]: acc[coins[cur.coinId].ticker]
                ? { ticker: coins[cur.coinId].ticker, value: acc[coins[cur.coinId].ticker].value + cur.current }
                : { ticker: coins[cur.coinId].ticker, value: cur.current }
        }), {})
    )

    return (
        <FinanceView>
            {combinedProviders(accounts).map(account =>
            (
                <View key={account.id}>
                    <TitleText>{account.provider.name}</TitleText>
                    {coins ? combinedCoinBalances(account.accountBalances).map(({ ticker, value }) => (
                        <Text key={ticker}>{ticker}: {value.toFixed(6)}</Text>
                    )) : null }
                    <Divider />
                </View>
            )
            )}
        </FinanceView>
    )
}

const FinanceView = styled.View`
    margin: 24px;
`

const TitleText = styled.Text`
    font-size: 24px;
`

const ValueText = styled.Text`
    font-size: 18px;
`

const Divider = styled.View`
    border: .5px solid grey;
    margin: 24px 4px;
`