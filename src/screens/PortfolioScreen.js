import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import InvestmentList from '../components/InvestmentList'
import PortfolioOverview from '../components/PortfolioOverview'
import WalletList from '../components/WalletList'
import useExchangeBalance from '../hooks/useExchangeBalance'
import useCurrency from '../hooks/useCurrency'
import useAuth from '../hooks/useAuth'

export default ({ navigation }) => {
    const layout = useWindowDimensions()
    const { get } = useAuth()
    const [wallets, setWallets] = useState([])
    const { accounts: exchangeAccounts, previewBalances: getExchangeBalances, getTotals: getExchangeTotals } = useExchangeBalance()
    const { currencies } = useCurrency()
    const [balances, setBalances] = useState({
        exchange: {}
    })
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'overview', title: 'Overview' },
        { key: 'wallet', title: 'Wallet' },
        { key: 'investment', title: 'Investment' },
    ])

    const loadWallets = () => get('wallets')
        .then(wallets => setWallets(wallets))

    useEffect(() => {
        const sub = navigation.addListener('focus', () => {
            loadWallets()
        })
        return sub
    }, [navigation])

    useEffect(() => {
        if(Object.values(exchangeAccounts).length != 0) {
            getExchangeBalances(exchangeAccounts)
                .then(balances => getExchangeTotals(exchangeAccounts, balances))
                .then(exchangeBalances => setBalances(p => ({ ...p, exchange: exchangeBalances })))
        }
    }, [exchangeAccounts])

    return (
        <TabView
            renderTabBar={props => (
                <StyledTabBar 
                    {...props}
                    indicatorStyle={{ backgroundColor: 'orange' }}
                    inactiveColor='lightgrey'
                    activeColor='orange'
                />
            )}
            navigationState={{ index, routes }}
            renderScene={SceneMap({
                overview: () => (
                    <PortfolioOverview 
                        navigation={navigation}
                        wallets={wallets}
                        exchangeAccounts={exchangeAccounts}
                        currencies={currencies}
                        balances={balances}
                    />
                ),
                wallet: () => <WalletList navigation={navigation} wallets={wallets} />,
                investment: () => (
                    <InvestmentList 
                        navigation={navigation}
                        exchangeAccounts={exchangeAccounts}
                        currencies={currencies}
                        balances={balances}
                    />
                )
            })}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}

const StyledTabBar = styled(TabBar)`
    background-color: white;
`