import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import Button from '../components/Button'
import HashrateHistory from '../components/HashrateHistory'
import useHashrate from '../hooks/useHashrate'
import usePool from '../hooks/usePool'

export default ({ navigation }) => {
    const { hashrateGroup, workers, getHashrates, getLatestHashrateTotal, getPoolTotal, readableHashrate } = useHashrate()
    const { getPools, pools } = usePool()
    const [icons] = useState({ eth: require(`../assets/eth.png`), zil: require(`../assets/zil.png`) })

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getHashrates()
            getPools()
        })
        return unsub
    }, [navigation])

    const goToPool = pool => () => navigation.push('Mining Pool', { name: pool.name, id: pool.id })

    return (
        <MiningView alwaysBounceVertical overScrollMode='always'>
            {hashrateGroup ? (
                <ChartView>
                    <HashrateHistory hashrates={getLatestHashrateTotal(hashrateGroup).filter((_, i) => i < 6)} />
                </ChartView>
            ) : null}

            {pools && hashrateGroup ? (
                Object.keys(pools).map(key => (
                    <PoolButton key={key} onPress={goToPool(pools[key][0].miningPool)}>
                        <TitleView>
                            <TitleText>{pools[key][0].miningPool.name}</TitleText>
                            <HashrateText>{readableHashrate(getPoolTotal(hashrateGroup, workers)[key].average)}</HashrateText>
                        </TitleView>
                        <CoinView>
                            {pools[key].map(balance => 
                                <Icon key={balance.id} source={icons[balance.ticker]} />
                            )}
                        </CoinView>
                    </PoolButton>
                ))) : null}
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
    padding: 8px;
    background-color: orange;
    border-radius: 10px;
`

const TitleView = styled.View`
    flex-direction: row;
    align-items: flex-end;
`

const TitleText = styled.Text`
    font-size: 24px;
    color: white;
`

const CoinView = styled.View`
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