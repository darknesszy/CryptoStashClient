import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import useHashrate from '../hooks/useHashrate'
import usePool from '../hooks/usePool'

export default ({ route, navigation }) => {
    const { id } = route.params
    const { hashrateGroup, readableHashrate, getHashrates } = useHashrate()

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getHashrates()
        })
        return unsub
    }, [navigation])

    return (
        <WorkerView>
            {hashrateGroup ? (
                <>
                    <ValueText>Current hashrate: {readableHashrate(hashrateGroup[id][0].current)}</ValueText>
                    <ValueText>Average hashrate: {readableHashrate(hashrateGroup[id][0].average)}</ValueText>
                    <ValueText>Reported hashrate: {readableHashrate(hashrateGroup[id][0].reported)}</ValueText>
                </>
            ) : null}
        </WorkerView>
    )
}

const WorkerView = styled.View`
    margin: 24px;
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