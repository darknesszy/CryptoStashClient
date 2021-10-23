import React, { useEffect, useState } from 'react'
import config from 'react-native-config'
import styled from 'styled-components/native'

export default HomeScreen = ({ navigation }) => {
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
            <TitleText>
                Home Screen
            </TitleText>
        </HomeView>
    )
}

const HomeView = styled.SafeAreaView`
    margin: 24px;
`

const TitleText = styled.Text`
    font-size: 24px;
`

const TestButton = styled.TouchableHighlight`

`