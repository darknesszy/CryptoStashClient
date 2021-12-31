import { capitalize } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import PortfolioBreakdown from '../../components/PortfolioBreakdown'

export default PortfolioOverview = ({ 
    wallets = [],
    walletBalances = {}, 
    currencyExchanges = [],
    exchangeBalances = {},
    blockchains,
    tokens 
}) => {
    const lightOrange = 'rgba(255, 165, 0, 0.2)'

    const summariseTokenBalance = () => [].concat(
        Object.values(walletBalances),
        Object.values(exchangeBalances)
    )
        .reduce(
            (tokenBalances, balances) => Object.keys(balances)
                .filter(tokenId => blockchains[tokenId])
                .reduce(
                    (acc, tokenId) => ({
                        ...acc,
                        [tokenId]: acc[tokenId] 
                            ? {
                                ...acc[tokenId],
                                balance: acc[tokenId].balance + balances[tokenId].savings
                            }
                            : {
                                name: blockchains[tokenId].name,
                                ticker: tokens[tokenId].ticker,
                                balance: balances[tokenId].savings
                            }
                    }),
                    tokenBalances
                ),
            {}
        )

    const tokenBalance = Object.values(summariseTokenBalance())

    return (
        <PortfolioOverviewView>
            <PortfolioBreakdown portfolio={tokenBalance} />
            
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
                {tokenBalance.map((tokens, index) => (
                    <Row key={tokens.name}>
                        <Col color={index % 2 == 1 ? lightOrange : null}>
                            <ColText>{tokens.ticker}</ColText>
                        </Col>
                        <Col color={index % 2 == 1 ? lightOrange : null} span={2}>
                            <ColText>{capitalize(tokens.name)}</ColText>
                        </Col>
                        <Col color={index % 2 == 1 ? lightOrange : null} span={4}>
                            <ColCurrencyText>{tokens.balance}</ColCurrencyText>
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