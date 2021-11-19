import React, { useEffect } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'

export default ({ navigation }) => {

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
        })
        return unsub
    }, [navigation])

    return (
        <FinanceView>
            <Text>Finance Screen</Text>
            {/* {exchanges.map(exchange => (
                <ExchangeButton key={exchange.id}>
                    <ExchangeView>
                        <Title>{exchange.name}</Title>
                    </ExchangeView>
                </ExchangeButton>
            ))} */}
        </FinanceView>
    )
}

const FinanceView = styled.ScrollView`
    padding-top: 24px;
`

const ExchangeView = styled.View`
    min-height: 58px;
    flex-direction: row;
    align-items: center;
`

const Title = styled.Text`
    font-size: 24px;
`

const ExchangeButton = styled(Button)`
    margin: 4px 24px;
    padding: 8px;
    background-color: orange;
    border-radius: 10px;
`