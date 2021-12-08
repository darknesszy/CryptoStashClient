import React, { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import styled from 'styled-components/native'
import Button from '../../components/Button'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { capitalize } from 'lodash'
import BalanceCard from '../../components/BalanceCard'

export default WalletList = ({ navigation, wallets }) => {
    const { get, del } = useAuth()
    const [icons] = useState({ ETH: require(`../../assets/eth.png`), ZIL: require(`../../assets/zil.png`) })
    const [selected, setSelected] = useState(-1)

    const removeWallet = id => Promise.resolve()
        .then(() => del(`wallets/${id}`))
        .then(() => setSelected(-1))

    const goToAddWallet = () => navigation.push('Add Crypto Wallet')

    const handlePress = wallet => () => {
        setSelected(wallet.id)
        Alert.alert(
            'Remove Wallet?',
            `Are you sure you want to stop monitoring ${wallet.currency.ticker} wallet ${wallet.address}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel Pressed")
                        setSelected(-1)
                    },
                    style: "cancel"
                },
                { text: "OK", onPress: () => removeWallet(wallet.id).then(() => load()) }
            ]
        )
    }

    return (
        <FlatList
            style={{ marginTop: 12 }}
            data={wallets}
            renderItem={({ item: wallet }) => (
                <BalanceCard
                    key={wallet.id}
                    onLongPress={handlePress(wallet)}
                    selected={selected == wallet.id && 'red'}
                    name={capitalize(wallet.currency.name)}
                    ticker={wallet.currency.ticker}
                    balance={wallet.balance || 0}
                    icon={icons[wallet.currency.ticker]}
                />
                // <>
                //     <ItemView key={wallet.id}>
                //         <InfoView>
                //             <DataView>
                //                 <Title>{capitalize(wallet.currency.name)}</Title>
                //                 <Subtitle>{wallet.address}</Subtitle>
                //             </DataView>
                //             <DataView>
                //                 <Title>{wallet.balance || 0}</Title>
                //                 {/* <Subtitle style={{ color: 'grey' }}>~{coins && item.coin && item.coin.id && coins[item.coin.id] && coins[item.coin.id].usd ? (coins[item.coin.id].usd * item.balance).toFixed(2): 0} USD</Subtitle> */}
                //             </DataView>
                //         </InfoView>
                //         <RemoveButton onPress={handlePress(wallet)}>
                //             <FontAwesomeIcon icon={faTimesCircle} color={'lightgrey'} size={24} />
                //         </RemoveButton>
                //     </ItemView>

                //     <Divider />
                // </>
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

const RemoveButton = styled(Button)`

`