import React, { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import styled from 'styled-components/native'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { capitalize } from 'lodash'

export default WalletList = ({ navigation, wallets }) => {
    const { get, del } = useAuth()
    const [icons] = useState({ ETH: require(`../assets/eth.png`), ZIL: require(`../assets/zil.png`) })

    const removeWallet = id => Promise.resolve()
        .then(() => del(`wallets/${id}`))

    const goToAddWallet = () => navigation.push('Add Crypto Wallet')

    const handlePress = wallet => () => Alert.alert(
        'Remove Wallet?',
        `Are you sure you want to stop monitoring ${wallet.currency.ticker} wallet ${wallet.address}?`,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => removeWallet(wallet.id).then(() => load()) }
        ]
    )

    return (
        <FlatList
            data={wallets}
            renderItem={({ item: wallet }) => (
                <>
                    <ItemView key={wallet.id}>
                        <InfoView>
                            <DataView>
                                <Title>{capitalize(wallet.currency.name)}</Title>
                                <Subtitle>{wallet.address}</Subtitle>
                            </DataView>
                            <DataView>
                                <Title>{wallet.balance || 0}</Title>
                                {/* <Subtitle style={{ color: 'grey' }}>~{coins && item.coin && item.coin.id && coins[item.coin.id] && coins[item.coin.id].usd ? (coins[item.coin.id].usd * item.balance).toFixed(2): 0} USD</Subtitle> */}
                            </DataView>
                        </InfoView>
                        <RemoveButton onPress={handlePress(wallet)}>
                            <FontAwesomeIcon icon={faTimesCircle} color={'lightgrey'} size={24} />
                        </RemoveButton>
                    </ItemView>

                    <Divider />
                </>
            )}
            ListFooterComponent={() => (
                <AddButton onPress={goToAddWallet}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        color={'grey'}
                        size={24}
                    />
                    <AddButtonText>Add Wallet</AddButtonText>
                </AddButton>
            )}
            keyExtractor={item => item.id}
        />
    )
}

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

const Divider = styled.View`
    border: .5px solid grey;
    margin: 12px 4px;
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