import React, { useEffect, useState } from 'react'
import { Text, FlatList, View } from 'react-native'
import config from 'react-native-config'
import styled from 'styled-components/native'

export default ({ navigation }) => {
    const [wallets, setWallets] = useState([])
    const [coins, setCoins] = useState({})

    useEffect(() => {
        const sub = navigation.addListener('focus', () => {
            getList()
            fetchCoins()
        })
        return sub
    }, [navigation])

    const getList = () => fetch(`${config.API_URL}/Wallets`)
        .then(res => res.json())
        .then(res => setWallets(res))
        .then(() => console.log('wallet data updated'))

    const fetchCoins = () => fetch(`${config.API_URL}/Coins`)
        .then(res => res.json())
        .then(res => res.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}))
        .then(res => setCoins(res))

    return (
        <FlatList
            data={wallets}
            renderItem={({ item }) => (
                <ItemView key={item.id}>
                    <TitleText>{item.balance} {item.coin.ticker.toUpperCase()}</TitleText>
                    <Text style={{ color: 'grey' }}>~{coins && item.coin && item.coin.id && coins[item.coin.id] && coins[item.coin.id].usd ? (coins[item.coin.id].usd * item.balance).toFixed(2): 0} USD</Text>
                    <SubText>{item.address}</SubText>
                    <Divider />
                </ItemView>
            )}
            keyExtractor={item => item.id}
        />
    )
}

const ItemView = styled.View`
    margin: 0 24px;
`

const TitleText = styled.Text`
    font-size: 22px;
`

const SubText = styled.Text`
    font-size: 8px;
`

const Divider = styled.View`
    border: .5px solid grey;
    margin: 24px 4px;
`