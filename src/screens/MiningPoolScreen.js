import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'
import useHashrate from '../hooks/useHashrate'
import { MiningContext } from '../components/MiningProvider'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import useWorker from '../hooks/useWorker'
import HashRateCard from '../components/HashRateCard'
import { capitalize } from 'lodash'
import { Divider } from '../components/Divider'

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

    const identifierEightValues = identifier =>
        `...${identifier.slice(identifier.length - 9, identifier.length)}`

    const lastReportedTime = hashRate =>
        addHours(hashRate.created)
            .toLocaleString()

    const goToWorker = worker => () => 
        navigation.push(
            'Mining Worker',
            { 
                name: worker.name,
                id: worker.id,
                identifier: worker.miningAccount.identifier
            }
        )
    const goToAccounts = () => navigation.push('Mining Accounts')
    
    return (
        <MiningPoolView>
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

            <FlatList
                style={{ flex: 1 }}
                data={workers}
                renderItem={({ item: worker }) => (
                    <HashRateCard
                        key={worker.id}
                        onPress={goToWorker(worker)}
                        active={true}
                        name={capitalize(worker.name)}
                        hashRate={hashRates[worker.id] && hashRates[worker.id][0].average}
                    >
                        <SubTextView>
                            <SubText>
                                Account ends in: {identifierEightValues(worker.miningAccount.identifier)}
                            </SubText>
                            {hashRates[worker.id] ? (
                                <SubText>
                                    Last reported: {lastReportedTime(hashRates[worker.id][0])}
                                </SubText>
                            ):null}
                        </SubTextView>
                    </HashRateCard>
                )}
                keyExtractor={item => item.id}
            />
        </MiningPoolView>
    )
}

const MiningPoolView = styled.SafeAreaView`
    height: 100%;
    padding-top: 12px;
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

const SubTextView = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const SubText = styled.Text`
    /* margin-left: 8px; */

    font-size: 8px;
`