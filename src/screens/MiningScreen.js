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
import HashRateCard from '../components/HashRateCard'
import { Divider } from '../components/Divider'

export default ({ navigation }) => {
    const { hasPoolAccount } = useContext(MiningContext)
    const { previewPools, mergePoolsHashRate, readableHashrate } = useHashrate()
    const { pools } = usePool()
    const [icons] = useState({ ETH: require(`../assets/eth.png`), ZIL: require(`../assets/zil.png`) })
    // Pool id mapped to latest 10 combined hashrates
    const [poolsHashRate, setPoolsHashRate] = useState({})

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            previewPools()
                .then(hashRates => setPoolsHashRate(hashRates))
        })
        return unsub
    }, [navigation])

    const historyHashRates = poolsHashRate =>
        Array.from(mergePoolsHashRate(poolsHashRate))
            .reverse()
            .filter((_, i) => i < 6)

    const goToPool = pool => () => navigation.push('Mining Pool', { name: pool.name, id: pool.id })
    const goToAccounts = () => navigation.push('Mining Accounts')

    return (
        <MiningView alwaysBounceVertical overScrollMode='always'>
            {Object.keys(poolsHashRate).length != 0 ? (
                <ChartView>
                    <HashrateHistory
                        hashRates={historyHashRates(poolsHashRate)}
                    />
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
            
            <Divider />

            {Object.values(pools).map(pool => (
                <HashRateCard 
                    key={pool.id}
                    active={hasPoolAccount(pool.id)}
                    onPress={goToPool(pool)}
                    name={`${capitalize(pool.name)} Pool`}
                    hashRate={poolsHashRate[pool.id] && poolsHashRate[pool.id][0].average}
                >
                    <CurrencyView>
                        {pool.currencies.map(currency => 
                            <Icon key={currency.id} source={icons[currency.ticker]} />
                        )}
                    </CurrencyView>
                </HashRateCard>
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

const CurrencyView = styled.View`
    flex-direction: row;
`

const Icon = styled.Image`
    width: 12px;
    height: 12px;
    margin-right: 4px;
`

const MenuView = styled.View`
    margin: 12px 24px 6px 24px;

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