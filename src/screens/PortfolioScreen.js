import React, { useEffect, useState } from 'react'
import { Text, FlatList, View } from 'react-native'
import config from 'react-native-config'
import styled from 'styled-components'

export default ({ navigation }) => {
    const [wallets, setWallets] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const getList = () => fetch(`${config.API_URL}/Wallets`)
        .then(res => res.json())
        .then(res => setWallets(res))

    return (
        <FlatList
            data={wallets}
            renderItem={({ item }) => (
                <ItemView key={item.id}>
                    <TitleText>{item.balance} {item.coin.ticker.toUpperCase()}</TitleText>
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