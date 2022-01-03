import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import InvestmentList from './InvestmentList'
import PortfolioOverview from './PortfolioOverview'
import WalletList from './WalletList'
import useExchangeBalance from '../../hooks/useExchangeBalance'
import useToken from '../../hooks/useToken'
import useBlockchain from '../../hooks/useBlockchain'
import useWalletBalance from '../../hooks/useWalletBalance'
import useAuth from '../../hooks/useAuth'

export default ({ navigation }) => {
    const layout = useWindowDimensions()
    const { get } = useAuth()

    const [wallets, setWallets] = useState()
    const [accounts, setAccounts] = useState()
    const { balances: walletBalances } = useWalletBalance(wallets)
    const { balances: exchangeBalances, getCurrencyExchanges } = useExchangeBalance(accounts)
    const { tokens } = useToken()
    const { blockchains, getTokenBlockchains } = useBlockchain()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        // { key: 'overview', title: 'Overview' },
        { key: 'wallets', title: 'Wallets' },
        { key: 'accounts', title: 'Accounts' }
    ])

    const loadWallets = () => Promise.resolve()
        .then(() => get('wallets'))
        .then(wallets => setWallets(wallets))

    const loadAccounts = () => Promise.resolve()
        .then(() => get('exchangeaccounts'))
        .then(accounts => setAccounts(accounts))

    useEffect(() => {
        const sub = navigation.addListener('focus', () => {
            loadWallets()
            loadAccounts()
        })
        return sub
    }, [navigation])

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
                        wallets={wallets}
                        walletBalances={walletBalances}
                        currencyExchanges={getCurrencyExchanges(accounts)}
                        exchangeBalances={exchangeBalances}
                        blockchains={getTokenBlockchains(blockchains)}
                        tokens={tokens}
                    />
                ),
                wallets: () => (
                    <WalletList 
                        navigation={navigation}
                        load={loadWallets}
                        wallets={wallets}
                        balances={walletBalances}
                        blockchains={blockchains}
                        tokens={tokens}
                    />
                ),
                accounts: () => (
                    <InvestmentList 
                        navigation={navigation}
                        tokens={tokens}
                        currencyExchanges={getCurrencyExchanges(accounts)}
                        exchangeBalances={exchangeBalances}
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