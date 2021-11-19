import React, { useEffect, useState } from 'react'
import { Alert, SectionList } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Divider } from '../components/Divider'
import { capitalize } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import useExchangeBalance from '../hooks/useExchangeBalance'
import useCurrency from '../hooks/useCurrency'

export default InvestmentScreen = ({ navigation }) => {
    const { accounts: exchangeAccounts, previewBalances: getExchangeBalances, getTotals: getExchangeTotals } = useExchangeBalance()
    const { currencies } = useCurrency()
    const [balances, setBalances] = useState({
        exchange: {}
    })

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {

        })
        return unsub
    }, [navigation])

    useEffect(() => {
        if(Object.values(exchangeAccounts).length != 0) {
            getExchangeBalances(exchangeAccounts)
                .then(balances => getExchangeTotals(exchangeAccounts, balances))
                .then(exchangeBalances => setBalances(p => ({ ...p, exchange: exchangeBalances })))
        }
    }, [exchangeAccounts])

    const goToAddService = () => navigation.push('Add Service API')
    const goToService = (type, service) => navigation.push('Service APIs', { name: service.name, id: service.id, type })

    const collectExchangeData = (exchangeAccounts, balances) => {
        exchanges = Object.values(exchangeAccounts)
            .reduce(
                (exchanges, account) => ({ 
                    ...exchanges,
                    [account.currencyExchange.id]: exchanges[account.currencyExchange.id]
                        ? exchanges[account.currencyExchange.id]
                        : account.currencyExchange
                }),
                {}
            )
        exchangeBalances = balances.exchange

        return Object.keys(exchangeBalances)
            .reduce(
                (acc, exchangeId) => [
                    ...acc,
                    {
                        title: exchanges[exchangeId].name,
                        type: 'Currency Exchange',
                        data: Object.keys(exchangeBalances[exchangeId])
                            .map(currencyId => ({ 
                                ...currencies[currencyId], 
                                balances: exchangeBalances[exchangeId][currencyId] 
                            }))
                    }
                ],
                []
            )
    }

    return (
        <SectionList
            sections={[].concat(
                collectExchangeData(exchangeAccounts, balances)
            )}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item: currency, section: { type } }) => (
                <>
                    <ItemButton key={currency.id} onPress={() => goToService(type)}>
                        <DataView>
                            <Title>{capitalize(currency.name)}</Title>
                            {/* <Subtitle>{wallet.address}</Subtitle> */}
                        </DataView>
                        <DataView>
                            <Title>{currency.balances && currency.balances[0].savings || 0}</Title>
                            {/* <Subtitle style={{ color: 'grey' }}>~{coins && item.coin && item.coin.id && coins[item.coin.id] && coins[item.coin.id].usd ? (coins[item.coin.id].usd * item.balance).toFixed(2): 0} USD</Subtitle> */}
                        </DataView>
                    </ItemButton>
                    <Divider />
                </>
            )}
            renderSectionHeader={({ section: { title, type } }) => (
                <ServiceButton onPress={() => goToService(type)}>
                    <ServiceTitle>{title}</ServiceTitle>
                </ServiceButton>
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

const DataView = styled.View`

`

const Title = styled.Text`
    font-size: 22px;
`

const Subtitle = styled.Text`
    font-size: 8px;
`

const AddButton = styled(Button)`
    margin: 0 24px;
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