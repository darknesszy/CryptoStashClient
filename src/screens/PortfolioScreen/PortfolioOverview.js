import { capitalize } from 'lodash'
import React from 'react'
import styled from 'styled-components/native'
import PortfolioBreakdown from '../../components/PortfolioBreakdown'

export default PortfolioOverview = ({ navigation, wallets, exchangeAccounts, currencies, balances }) => {
    const lightOrange = 'rgba(255, 165, 0, 0.2)'
    const summariseWallets = wallets => wallets.reduce(
        (data, wallet) => ({
            ...data,
            [wallet.currency.id]: data[wallet.currency.id]
                ? {
                    name: data[wallet.currency.id].name,
                    ticker: data[wallet.currency.id].ticker,
                    balance: data[wallet.currency.id].balance + wallet.balance
                }
                : {
                    name: wallet.currency.name,
                    ticker: wallet.currency.ticker,
                    balance: wallet.balance || 0
                }
        }),
        {}
    )

    return (
        <PortfolioOverviewView>
            <PortfolioBreakdown />
            <Table>
                <Row>
                    <Col color="orange">
                        <ColText color="white">Ticker</ColText>
                    </Col>
                    <Col color="orange" span={2}>
                        <ColText color="white">Coin Name</ColText>
                    </Col>
                    <Col color="orange" span={4}>
                        <ColText color="white">Total Balance</ColText>
                    </Col>
                </Row>
                {Object.values(summariseWallets(wallets)).map((currencies, index) => (
                    <Row key={currencies.name}>
                        <Col color={index % 2 == 1 ? lightOrange : null}>
                            <ColText>{currencies.ticker}</ColText>
                        </Col>
                        <Col color={index % 2 == 1 ? lightOrange : null} span={2}>
                            <ColText>{capitalize(currencies.name)}</ColText>
                        </Col>
                        <Col color={index % 2 == 1 ? lightOrange : null} span={4}>
                            <ColCurrencyText>{currencies.balance}</ColCurrencyText>
                        </Col>
                    </Row>
                ))}
            </Table>
        </PortfolioOverviewView>
    )
}

const PortfolioOverviewView = styled.ScrollView`
    padding-top: 24px;
`

const CurrencyView = styled.View`
    margin: 12px 24px;
`

const Table = styled.ScrollView`
    flex: 1;
    margin: 24px;

    border-color: grey;
    border-style: solid;
    border-top-width: 1px;
    border-left-width: 1px;
`

const Row = styled.View`
    flex-direction: row;

    border-color: grey;
    border-style: solid;
    border-bottom-width: 1px;
`

const Col = styled.View`
    flex: ${props => props.span || 1 };
    padding: 4px;

    border-color: grey;
    border-style: solid;
    border-right-width: 1px;
    background-color: ${props => props.color || 'transparent'};
`

const ColText = styled.Text`
    font-size: 10px;
    color: ${props => props.color || 'grey'};
`

const ColCurrencyText = styled(ColText)`
    align-self: flex-end;
`