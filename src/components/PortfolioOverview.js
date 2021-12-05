import React from 'react'
import styled from 'styled-components/native'
import PortfolioBreakdown from './PortfolioBreakdown'

export default PortfolioOverview = ({ navigation, wallets, exchangeAccounts, currencies, balances }) => {

    const summariseWallets = wallets => wallets.reduce(
        (data, wallet) => ({
            ...data,
            [wallet.currency.id]: data[wallet.currency.id]
                ? { 
                    name: data[wallet.currency.id].name,
                    balance: data[wallet.currency.id].balance + wallet.balance
                }
                : {
                    name: wallet.currency.name,
                    balance: wallet.balance || 0
                }
        }),
        {}
    )

    return (
        <PortfolioOverviewView>
            <PortfolioBreakdown />
            {Object.values(summariseWallets(wallets)).map(currencies => (
                <CurrencyView key={currencies.name}>
                    <Title>{currencies.name} - {currencies.balance}</Title>
                </CurrencyView>
            ))}
        </PortfolioOverviewView>
    )
}

const PortfolioOverviewView = styled.ScrollView`
    padding-top: 24px;
`

const CurrencyView = styled.View`
    margin: 12px 24px;
`

const Title = styled.Text`
`