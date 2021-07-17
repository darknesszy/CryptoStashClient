import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, FlatList } from 'react-native'
import config from 'react-native-config'
import styled from 'styled-components'

export default ({ route, navigation }) => {
    const { id } = route.params
    const [workers, setWorkers] = useState([])

    useEffect(() => {
        const sub = navigation.addListener('focus', () => getList())
        return sub
    }, [navigation])

    const getList = () => fetch(`${config.API_URL}/MiningPools/${id}`)
        .then(res => res.json())
        .then(pool => Promise.all(
            pool.workers.map(worker => 
                fetch(`${config.API_URL}/Workers/${worker.id}`)
                    .then(res => res.json())
            )
        ))
        .then(workers => setWorkers(workers))
        .then(() => console.log('worker data updated'))
    
    const addHours = date => {
        const t = new Date(date)
        t.setHours(t.getHours() + 8)
        return t
    }

    return (
        <FlatList
            data={workers}
            renderItem={({ item }) => (
                <ListTouchable
                    key={item.id}
                    onPress={() => navigation.navigate('Worker', { name: item.name })}
                >
                    <TitleText>{item.name}</TitleText>
                    <SubText>{item.address}</SubText>
                    {item.hashrates ? (
                        <>
                            <Text>current: {(item.hashrates[0].current / 1000000).toFixed(3)} MH/s</Text>
                            <Text>average: {(item.hashrates[0].average / 1000000).toFixed(3)} MH/s</Text>
                            <Text>reported: {(item.hashrates[0].reported / 1000000).toFixed(3)} MH/s</Text>
                            <Text>Last report: {addHours(item.hashrates[0].created).toLocaleString()}</Text>
                        </>
                    ) : null}
                    <Divider />
                </ListTouchable>
            )}
            keyExtractor={item => item.id}
        />
    )
}

const ListTouchable = styled.TouchableOpacity`
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