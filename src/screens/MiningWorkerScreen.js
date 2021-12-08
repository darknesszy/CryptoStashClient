import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Divider } from '../components/Divider'
import HashRateCard from '../components/HashRateCard'
import { MiningContext } from '../components/MiningProvider'
import useHashrate from '../hooks/useHashrate'
import useWorker from '../hooks/useWorker'

export default MiningWorkerScreen = ({ route, navigation }) => {
    const { id, name, identifier } = route.params
    const { accounts } = useContext(MiningContext)
    const { previewWorkers } = useHashrate()
    const { workers, load } = useWorker(
        Object.values(accounts)
            .filter(account => account.miningPool.id == id)
            .map(account => account.id)
    )
    const [hashRates, setHashRates] = useState({})
    const [worker, setWorker] = useState({})

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            load()
        })
        return unsub
    }, [navigation])

    useEffect(() => {
        setWorker(workers[workers.map(el => el.id).indexOf(id)])
        previewWorkers(workers)
            .then(hashRates => setHashRates(hashRates))
    }, [workers])

    const addHours = date => {
        const t = new Date(date)
        t.setHours(t.getHours() + 8)
        return t
    }

    return (
        <MiningWorkerView>
            <InfoView>
                <Title>Identifier</Title>
                <Subtitle>{identifier}</Subtitle>
            </InfoView>

            {hashRates[id] ? (
                <>
                    <DateLabel>Last report: {addHours(hashRates[id][0].created).toLocaleString()}</DateLabel>
                    {/* <Divider /> */}
                    <HashRateCard active name="Current" hashRate={hashRates[id][0].current} />
                    <HashRateCard active name="Average" hashRate={hashRates[id][0].average} />
                    <HashRateCard active name="Reported" hashRate={hashRates[id][0].reported} />
                    {/* <Labels>current: {readableHashrate(hashRates[id][0].current)}</Labels>
                    <Labels>average: {readableHashrate(hashRates[id][0].average)}</Labels>
                    <Labels>reported: {readableHashrate(hashRates[id][0].reported)}</Labels> */}
                </>
            ) : null}
        </MiningWorkerView>
    )
}

const MiningWorkerView = styled.SafeAreaView`

`

const InfoView = styled.View`
    margin: 24px;
    padding: 12px;

    border: 2px solid orange;
    border-radius: 5px;
`

const Title = styled.Text`
    font-size: 24px;
    color: orange;
`
const Subtitle = styled.Text`

`

const DateLabel = styled.Text`
    margin-right: 24px;
    text-align: right;
    color: lightgrey;
`