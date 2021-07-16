import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import config from 'react-native-config'
import styled from 'styled-components'

export default HomeScreen = () => {
    const [wallets, setWallets] = useState([])

    useEffect(() => {
        // console.log(config.API_URL)
        // testData()
    }, [])

    const testData = async () => {

        const res = await fetch(`${config.API_URL}/MiningPools`)
        const pool = await res.json()
        
        setWallets([])

        // if(pool && pool.poolBalances) {
        //     await Promise.all(pool.poolBalances.map(async el => {
        //         const res2 = await fetch(`${config.API_URL}/PoolBalances/${el.id}`)
        //         const data = await res2.json()
        //         const res3 = await fetch(`${config.API_URL}/Wallets/${data.wallet.id}`)
        //         const wallet = await res3.json()

        //         setWallets(p => [ ...p, { ...wallet, balance: el.current.toFixed(6) } ])
        //     }))
        // }
    }

    return (
        <HomeView>
            {wallets.map(wallet => 
                (
                    <View key={wallet.id}>
                        <TitleText>Wallet Address</TitleText>
                        <Text>{ wallet.address }</Text>
                        <TitleText>Pool Balance</TitleText>
                        <ValueText>{ wallet.balance } { wallet.coin.ticker.toUpperCase() }</ValueText>
                        <Divider />
                    </View>
                )
            )}
        </HomeView>
    )
}

const HomeView = styled.SafeAreaView`
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