import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'
import useHashrate from '../hooks/useHashrate'
import { MiningContext } from '../components/MiningProvider'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import useWorker from '../hooks/useWorker'

export default MiningPoolScreen = ({ route, navigation }) => {
    const { id, name } = route.params
    const { accounts } = useContext(MiningContext)
    const { previewWorkers, readableHashrate } = useHashrate()
    const { workers, load } = useWorker(
        Object.values(accounts)
            .filter(account => account.miningPool.id == id)
            .map(account => account.id)
    )
    const [hashRates, setHashRates] = useState({})

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            load()
        })
        return unsub
    }, [navigation])

    useEffect(() => {
        previewWorkers(workers)
            .then(hashRates => setHashRates(hashRates))
    }, [workers])
    
    const addHours = date => {
        const t = new Date(date)
        t.setHours(t.getHours() + 8)
        return t
    }

    // const goToWorker = worker => () => navigation.push('Mining Worker', { name: worker.name, id: worker.id })
    const goToWorker = worker => () => {}
    const goToAccounts = () => navigation.push('Mining Accounts')

    return (
        <MiningPoolView>
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
                data={workers}
                renderItem={({ item: worker }) => (
                    <WorkerButton key={worker.id} onPress={goToWorker(worker)}>
                        <TitleText>{worker.name}</TitleText>
                        <SubText>{worker.miningAccount.identifier}</SubText>
                        {hashRates[worker.id] ? (
                            <>
                                <Text>current: {readableHashrate(hashRates[worker.id][0].current)}</Text>
                                <Text>average: {readableHashrate(hashRates[worker.id][0].average)}</Text>
                                <Text>reported: {readableHashrate(hashRates[worker.id][0].reported)}</Text>
                                <Text>Last report: {addHours(hashRates[worker.id][0].created).toLocaleString()}</Text>
                            </>
                        ) : null}
                        <Divider />
                    </WorkerButton>
                )}
                keyExtractor={item => item.id}
            />
        </MiningPoolView>
    )
}

const MiningPoolView = styled.SafeAreaView`

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