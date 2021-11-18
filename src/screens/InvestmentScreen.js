import React, { useEffect, useState } from 'react'
import { Alert, SectionList } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Divider } from '../components/Divider'
import { capitalize } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import useExchange from '../hooks/useExchange'

export default InvestmentScreen = ({ navigation }) => {
    const { accounts: exchangeAccounts, previewBalances: getExchangeBalances } = useExchange()
    const [balances, setBalances] = useState({
        exchange: {}
    })

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getExchangeBalances(exchangeAccounts)
                .then(balances => setBalances(p => ({ ...p, exchange: balances })))
        })
        return unsub
    }, [navigation])

    const goToAddService = () => navigation.push('Add Service API')

    const handlePress = account => () => Alert.alert(
        'Remove Account?',
        `Are you sure you want to stop monitoring ${account.identifier}?`,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => removeAccount(account.id).then(() => getAccounts()) }
        ]
    )

    const collectExchangeAccountData = exchangeAccounts => Object.values(
        Object.values(exchangeAccounts).reduce(
            (acc, account) => ({
                ...acc,
                [account.currencyExchange.name]: {
                    title: account.currencyExchange.name,
                    data: acc[account.currencyExchange.name]
                    ? [
                        ...acc[account.currencyExchange.name].data,
                        { ...account, balances: balances.exchange[account.id] }
                    ]
                    : [
                        { ...account, balances: balances.exchange[account.id] }
                    ]
                }
            }),
            {}
        )
    )

    return (
        <SectionList
            sections={[].concat(
                collectExchangeAccountData(exchangeAccounts)
            )}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item: account }) => (
                <>
                    <ItemView key={account.id}>
                        <InfoView>
                            <DataView>
                                <Title>{capitalize(account.name)}</Title>
                                {/* <Subtitle>{wallet.address}</Subtitle> */}
                            </DataView>
                            <DataView>
                                {/* <Title>{wallet.balance || 0}</Title> */}
                                {/* <Subtitle style={{ color: 'grey' }}>~{coins && item.coin && item.coin.id && coins[item.coin.id] && coins[item.coin.id].usd ? (coins[item.coin.id].usd * item.balance).toFixed(2): 0} USD</Subtitle> */}
                            </DataView>
                        </InfoView>
                        <RemoveButton onPress={handlePress(account)}>
                            <FontAwesomeIcon icon={faTimesCircle} color={'lightgrey'} size={24} />
                        </RemoveButton>
                    </ItemView>
                    <Divider />
                </>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <PoolView>
                    <PoolTitle>{title}</PoolTitle>
                </PoolView>
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

const PoolView = styled.View`
    margin: 0 24px;
`

const PoolTitle = styled.Text`
    font-size: 24px;
`

const ItemView = styled.View`
    margin: 0 24px;
    margin-top: 12px;

    flex-direction: row;
    align-items: center;
`

const InfoView = styled.View`
    margin-right: 24px;

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

const RemoveButton = styled(Button)`

`