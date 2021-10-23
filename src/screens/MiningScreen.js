import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import config from 'react-native-config'
import styled from 'styled-components/native'
// import HashrateHistory from '../components/HashrateHistory'

export default ({ navigation }) => {
    const [pools, setPools] = useState([])
    const [hashrates, setHashrates] = useState({})
    const [balances, setBalances] = useState({})

    useEffect(() => {
        console.log(config.API_URL)
        const sub = navigation.addListener('focus', () => getList())
        return sub
    }, [navigation])

    const getList = () => fetch(`${config.API_URL}/MiningPools`)
        .then(res => res.json())
        .then(pools => Promise.all(
            pools.map(pool =>
                fetch(`${config.API_URL}/MiningPools/${pool.id}`)
                    .then(res => res.json())
            )
        ))
        .then(pools => {
            setPools(pools)
            console.log('pool data updated')

            Promise.all(
                pools.map(pool => Promise.all(
                    pool.workers.map(worker =>
                        fetch(`${config.API_URL}/Workers/${worker.id}`)
                            .then(res => res.json())
                    )
                )
                    .then(res => res.reduce((acc, cur) => acc + cur.hashrates[0].current, 0))
                    .then(res => ({ pool, hashrate: res })
                    ))
            )
                .then(res => res.reduce((acc, cur) => ({ ...acc, [cur.pool.name]: cur.hashrate }), {}))
                .then(res => setHashrates(res))


            fetch(`${config.API_URL}/Wallets/`)
                .then(res => res.json())
                .then(wallets => wallets.reduce((acc, cur) => ({ ...acc, [cur.address]: cur }), {}))
                .then(wallets => pools.reduce((acc, cur) => (
                    {
                        ...acc,
                        [cur.name]: cur.poolBalances
                            .filter(poolBalance => Object.keys(wallets).includes(poolBalance.address))
                            .reduce((acc, cur) => ({
                                ...acc,
                                [wallets[cur.address].coin.ticker]: acc[wallets[cur.address].coin.ticker]
                                    ? acc[wallets[cur.address].coin.ticker] + cur.current
                                    : cur.current
                            }), {})
                    }),
                    {}
                ))
                .then(sortedBalances => setBalances(sortedBalances))
        })

    return (
        <>
        {/* <View style={{ margin: 24 }}>
            <HashrateHistory />
        </View> */}
            
            {pools.map(pool => (
                <TouchableOpacity
                    key={pool.name}
                    onPress={() => navigation.navigate('Mining Pool', { id: pool.id, name: pool.name })}
                >
                    <TitleText>{pool.name}</TitleText>
                    <Text>Hashrate: {(hashrates[pool.name] / 1000000000).toFixed(3)} GH/s</Text>
                    {balances[pool.name] ? Object.keys(balances[pool.name]).map(key => (
                        <Text key={key}>{key.toUpperCase()}: {balances[pool.name][key].toFixed(6)}</Text>
                    )) : null}
                    <Divider />
                </TouchableOpacity>
            ))}
        </>
    )
}

const MiningView = styled.View`
    margin: 24px;
`

const ItemView = styled.View`
    margin: 0 24px;
`

const TitleText = styled.Text`
    font-size: 24px;
`

const ValueText = styled.Text`
    font-size: 18px;
`

const Divider = styled.View`
    border: .5px solid grey;
    margin: 24px 4px;
`