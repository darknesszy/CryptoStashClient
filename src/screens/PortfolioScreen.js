import React, { useEffect, useState } from 'react'
import { Text, useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import styled from 'styled-components/native'
import InvestmentScreen from './InvestmentScreen'
import WalletScreen from './WalletScreen'

export default ({ navigation }) => {
    const layout = useWindowDimensions()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'investment', title: 'Investment' },
        { key: 'overview', title: 'Overview' },
        { key: 'wallet', title: 'Wallet' },

    ])

    useEffect(() => {
        const sub = navigation.addListener('focus', () => {
            // getList()
            // fetchCoins()
        })
        return sub
    }, [navigation])

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={SceneMap({
                overview: () => (
                    <TabPageView>
                        <Text>Overview</Text>
                    </TabPageView>
                ),
                wallet: () => <WalletScreen navigation={navigation} />,
                investment: () => <InvestmentScreen navigation={navigation} />
            })}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}

const TabPageView = styled.View`
    /* height: 500px;
    background-color: black; */
`