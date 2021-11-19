import React, { useContext, useEffect } from 'react'
import { Alert, SectionList } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Divider } from '../components/Divider'
import { capitalize } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import useExchangeBalance from '../hooks/useExchangeBalance'
import useAuth from '../hooks/useAuth'

export default ServiceApiScreen = ({ navigation }) => {
    const { del } = useAuth()
    const { accounts } = useExchangeBalance()

    const removeAccount = id => Promise.resolve()
        .then(() => del(`exchangeaccounts/${id}`))

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

    const toSectionData = accounts => Object.values(
        Object.values(accounts).reduce(
            (acc, account) => ({ 
                ...acc,
                [account.currencyExchange.id]: {
                    title: acc[account.currencyExchange.id]
                        ? acc[account.currencyExchange.id].title
                        : `${capitalize(account.currencyExchange.name)} Exchange`,
                    data: [ 
                        ...acc[account.currencyExchange.id] 
                            ? acc[account.currencyExchange.id].data 
                            : [],
                        account
                    ]
                }
            }),
            {}
        )
    )

    return (
        <MiningAccountView>
            <SectionList
                sections={toSectionData(accounts)}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item: account }) => (
                    <>
                        <AccountView key={account.id}>
                            <AccountTitle>{account.name}</AccountTitle>
                            <RemoveButton onPress={handlePress(account)}>
                                <FontAwesomeIcon icon={faTimesCircle} color={'lightgrey'} size={24} />
                            </RemoveButton>
                        </AccountView>
                        <Divider />
                    </>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <PoolView>
                        <PoolTitle>{title}</PoolTitle>
                    </PoolView>
                )}
            />
        </MiningAccountView>
    )
}

const MiningAccountView = styled.SafeAreaView`
    margin-top: 24px;
`

const PoolView = styled.View`
    margin: 0 24px;
`

const PoolTitle = styled.Text`
    font-size: 24px;
`

const AccountView = styled.View`
    flex-direction: row;
    margin: 0 40px;

    justify-content: space-between;
    align-items: center;
`

const AccountTitle = styled.Text`
    margin-right: 24px;
`

const RemoveButton = styled(Button)`

`