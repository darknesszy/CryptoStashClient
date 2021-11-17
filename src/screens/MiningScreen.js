import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { capitalize } from 'lodash'
import Button from '../components/Button'
import HashrateHistory from '../components/HashrateHistory'
import useHashrate from '../hooks/useHashrate'
import usePool from '../hooks/usePool'
import { MiningContext } from '../components/MiningProvider'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

export default ({ navigation }) => {
    const { accounts, hasPoolAccount } = useContext(MiningContext)
    const { hashrateGroup, workers, getLatestHashrateTotal, getPoolTotal, readableHashrate } = useHashrate()
    const { pools, hashRates, getHashRates } = usePool()
    const [icons] = useState({ ETH: require(`../assets/eth.png`), ZIL: require(`../assets/zil.png`) })

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getHashRates()
        })
        return unsub
    }, [navigation])

    const goToPool = pool => () => navigation.push('Mining Pool', { name: pool.name, id: pool.id })
    const goToAccounts = () => navigation.push('Mining Accounts')

    return (
        <MiningView alwaysBounceVertical overScrollMode='always'>
            {hashrateGroup ? (
                <ChartView>
                    <HashrateHistory hashrates={getLatestHashrateTotal(hashrateGroup).filter((_, i) => i < 6)} />
                </ChartView>
            ) : null}

            <MenuView>
                <MenuButton onPress={goToAccounts}>
                    <FontAwesomeIcon 
                        icon={faCogs}
                        color={'orange'}
                        size={24}
                    />
                    <MenuText>Manage</MenuText>
                </MenuButton>
            </MenuView>

            {Object.values(pools).map(pool => (
                <PoolButton key={pool.id} active={hasPoolAccount(pool.id)} onPress={goToPool(pool)}>
                    <PoolInfoView>
                        <Title>{capitalize(pool.name)} Pool</Title>
                        {hashRates[pool.id] ? (
                            <HashrateText>{readableHashrate(hashRates[pool.id][0].average)}</HashrateText>
                        ) : null}
                    </PoolInfoView>
                    <CurrencyView>
                        {pool.currencies.map(currency => 
                            <Icon key={currency.id} source={icons[currency.ticker]} />
                        )}
                    </CurrencyView>
                </PoolButton>
            ))}
        </MiningView>
    )
}

const MiningView = styled.ScrollView`
    /* margin: 24px 0; */
`

const ChartView = styled.View`
    margin-top: 36px;
    margin-bottom: 4px;
`

const PoolButton = styled(Button)`
    margin: 4px 24px;
    padding: 8px 12px;

    background-color: orange;
    opacity: ${({ active }) => active ? '1' : '.5'};
    border-radius: 10px;
`

const PoolInfoView = styled.View`
    flex-direction: row;
    align-items: flex-end;
`

const Title = styled.Text`
    font-size: 24px;
    color: white;
`

const CurrencyView = styled.View`
    flex-direction: row;
`

const HashrateText = styled.Text`
    margin-left: 10px;

    font-size: 18px;
    color: white;
`

const Icon = styled.Image`
    width: 12px;
    height: 12px;
    margin-right: 4px;
`

const Divider = styled.View`
    border: .5px solid grey;
    margin: 24px 4px;
`

const MenuView = styled.View`
    margin: 6px 24px;

    flex-direction: row;
    justify-content: flex-end;
`

const MenuText = styled.Text`
    margin-left: 10px;

    font-size: 18px;
    color: black;
`

const MenuButton = styled(Button)`
    padding: 4px 8px;

    flex-direction: row;
    border: 1px solid orange;
    border-radius: 5px;
`