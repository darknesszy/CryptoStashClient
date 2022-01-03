import React, { useContext, useState } from 'react'
import { Alert, SectionList } from 'react-native'
import styled from 'styled-components/native'
import Button from '../../components/Button'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { capitalize } from 'lodash'
import BalanceCard from '../../components/BalanceCard'
import { Divider } from '../../components/Divider'
import { TokenContext } from '../../components/TokenProvider'

export default WalletList = ({ navigation, load, wallets = [], balances = {}, blockchains, tokens }) => {
    const { getStableCoinRate } = useContext(TokenContext)
    const { del } = useAuth()
    const [icons] = useState({ ETH: require(`../../assets/eth.png`), ZIL: require(`../../assets/zil.png`) })

    const addressEightValues = address => address.slice(address.length - 6, address.length)

    const removeWallet = id => Promise.resolve()
        .then(() => del(`wallets/${id}`))
        
    const goToAddWallet = () => navigation.push('Add Crypto Wallet')

    const handleRemove = wallet => () => 
        Alert.alert(
            'Remove Wallet?',
            `Are you sure you want to stop monitoring ${wallet.blockchain.name} wallet ${wallet.address}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => removeWallet(wallet.id).then(() => load()) }
            ]
        )

    const toSectionData = (wallets, balances) => wallets
        .filter(wallet => blockchains[wallet.blockchain.id] && balances[wallet.id])
        .reduce(
            (acc, wallet) => [
                ...acc,
                {
                    title: `${blockchains[wallet.blockchain.id].name} (${addressEightValues(wallet.address)})`,
                    wallet,
                    data: Object.values(balances[wallet.id])
                }
            ],
            []
        )
        toSectionData(wallets, balances)
    return (
        <SectionList
            style={{ marginTop: 12 }}
            sections={toSectionData(wallets, balances)}
            renderItem={({ item: balance }) => (
                <BalanceCard
                    key={balance.id}
                    name={capitalize(tokens[balance.tokenId].name)}
                    ticker={tokens[balance.tokenId].ticker}
                    balance={balance.savings || 0}
                    usd={balance.savings && getStableCoinRate({ id: balance.tokenId }) * balance.savings}
                    icon={icons[tokens[balance.tokenId].ticker]}
                />
            )}
            renderSectionHeader={({ section: { title, wallet } }) => (
                <>
                    <WalletTitle>
                        <ServiceTitle>{title}</ServiceTitle>
                        <RemoveButton onPress={handleRemove(wallet)}>
                            <FontAwesomeIcon icon={faTimesCircle} color={'lightgrey'} size={24} />
                        </RemoveButton>
                    </WalletTitle>
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

const WalletTitle = styled.View`
    margin: 0 24px;
    margin-top: 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ServiceTitle = styled.Text`
    font-size: 24px;
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

const RemoveButton = styled(Button)`

`