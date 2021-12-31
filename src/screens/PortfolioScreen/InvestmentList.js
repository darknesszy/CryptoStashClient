import React, { useEffect, useState } from 'react'
import { Alert, SectionList } from 'react-native'
import styled from 'styled-components/native'
import Button from '../../components/Button'
import { Divider } from '../../components/Divider'
import { capitalize } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import BalanceCard from '../../components/BalanceCard'

export default InvestmentList = ({ navigation, currencyExchanges = [], exchangeBalances = {}, tokens }) => {
    const [icons] = useState({ ETH: require(`../../assets/eth.png`), ZIL: require(`../../assets/zil.png`) })

    const goToAddService = () => navigation.push('Add Service API')
    const goToService = type => navigation.push('Service APIs', { type })

    // Combined token balance of each service type
    const toSectionData = (currencyExchanges, exchangeBalances) => currencyExchanges
        .map(currencyExchange => ({
            title: currencyExchange.name,
            type: 'Currency Exchange',
            data: exchangeBalances[currencyExchange.id] ? Object.values(exchangeBalances[currencyExchange.id]) : []
        }))

    return (
        <SectionList
            sections={toSectionData(currencyExchanges, exchangeBalances)}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item: token, section: { type } }) => (
<></>
                // <BalanceCard
                //     key={token.id}
                //     onPress={() => goToService(type)}
                //     name={capitalize(token.name)}
                //     ticker={token.ticker}
                //     balance={token.balances[0].savings || 0}
                //     icon={icons[token.ticker]}
                // />
            )}
            renderSectionHeader={({ section: { title, type } }) => (
                <>
                    <ServiceButton onPress={() => goToService(type)}>
                        <ServiceTitle>{title}</ServiceTitle>
                    </ServiceButton>
                    <Divider />
                </>
            )}
            ListFooterComponent={() => (
                <AddButton onPress={goToAddService}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        color={'grey'}
                        size={24}
                    />
                    <AddButtonText>Add Service API</AddButtonText>
                </AddButton>
            )}
        />
    )
}

const ServiceButton = styled(Button)`
    margin: 0 24px;
    margin-top: 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ServiceTitle = styled.Text`
    font-size: 24px;
`

const ItemButton = styled(Button)`
    margin: 0 24px;
    margin-top: 12px;

    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const AddButton = styled(Button)`
    margin: 0 24px;
    margin-top: 24px;
    padding: 12px;

    flex-direction: row;
    justify-content: center;

    border: 1px dashed grey;
    border-radius: 5px;
`

const AddButtonText = styled.Text`
    margin-left: 10px;

    font-size: 18px;
    color: grey;
`