import React, { useEffect, useState } from 'react'
import { Text, FlatList } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'
import useHashrate from '../hooks/useHashrate'
import usePool from '../hooks/usePool'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

export default ({ route, navigation }) => {
    const { id, name } = route.params
    const { hashrateGroup, workers, getHashrates, readableHashrate } = useHashrate()
    // const { getPools } = usePool()

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            // getHashrates()
            // getPools()
        })
        return unsub
    }, [navigation])
    
    const addHours = date => {
        const t = new Date(date)
        t.setHours(t.getHours() + 8)
        return t
    }

    const goToWorker = worker => () => navigation.push('Worker', { name: worker.name, id: worker.id })
    const goToAccounts = () => navigation.push('Pool Accounts', { name, id })

    return (
        <PoolView>
            <MenuView>
                <MenuButton onPress={goToAccounts}>
                    <FontAwesomeIcon 
                        icon={faCogs}
                        color={'grey'}
                        size={24}
                    />
                    <MenuText>Manage</MenuText>
                </MenuButton>
            </MenuView>

            <Divider />

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
        </PoolView>
    )
}

const PoolView = styled.SafeAreaView`

`

const MenuView = styled.View`
    margin: 14px 24px 0 20px;

    flex-direction: row;
    justify-content: flex-end;
`

const MenuText = styled.Text`
    margin-left: 10px;

    font-size: 18px;
    color: grey;
`

const MenuButton = styled(Button)`
    padding: 4px 8px;

    flex-direction: row;
    border: 1px solid grey;
    border-radius: 5px;
`

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