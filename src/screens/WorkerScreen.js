import React from 'react'
import { View } from 'react-native'
import config from 'react-native-config'
import styled from 'styled-components/native'

export default ({ route, navigation }) => {
    const { id } = route.params

    return (
        <WorkerView>
            {/* <TitleText>{worker.name}</TitleText>
            <Text>{worker.address}</Text> */}
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