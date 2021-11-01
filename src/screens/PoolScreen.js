import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, FlatList, View } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'
import useHashrate from '../hooks/useHashrate'
import usePool from '../hooks/usePool'

export default ({ route, navigation }) => {
    const { id } = route.params
    const { hashrateGroup, workers, getHashrates, readableHashrate } = useHashrate()
    const { getPools } = usePool()

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getHashrates()
            getPools()
        })
        return unsub
    }, [navigation])
    
    const addHours = date => {
        const t = new Date(date)
        t.setHours(t.getHours() + 8)
        return t
    }

    const goToWorker = worker => () => navigation.push('Worker', { name: worker.name, id: worker.id })

    return (
        <FlatList
            data={workers && workers.filter(worker => worker.miningPool.id == id)}
            renderItem={({ item: worker }) => (
                <WorkerButton key={worker.id} onPress={goToWorker(worker)}>
                    <TitleText>{worker.name}</TitleText>
                    <SubText>{worker.address}</SubText>
                    {hashrateGroup ? (
                        <>
                            <Text>current: {readableHashrate(hashrateGroup[worker.id][0].current)}</Text>
                            <Text>average: {readableHashrate(hashrateGroup[worker.id][0].average)}</Text>
                            <Text>reported: {readableHashrate(hashrateGroup[worker.id][0].reported)}</Text>
                            <Text>Last report: {addHours(hashrateGroup[worker.id][0].created).toLocaleString()}</Text>
                        </>
                    ) : null}
                    <Divider />
                </WorkerButton>
            )}
            keyExtractor={item => item.id}
        />
    )
}

const WorkerButton = styled(Button)`
    margin: 0 24px;
`

const TitleText = styled.Text`
    font-size: 24px;
`

const SubText = styled.Text`
    font-size: 8px;
`

const Divider = styled.View`
    border: .5px solid grey;
    margin: 24px 4px;
`