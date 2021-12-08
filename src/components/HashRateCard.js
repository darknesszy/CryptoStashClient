import React from 'react'
import styled from 'styled-components/native'
import Button from './Button'

export default HashRateCard = props => {

    const readableHashrate = hashrate => hashrate > 1000000000
        ? `${(hashrate / 1000000000).toFixed(3) } Gh/s`
        : `${(hashrate / 1000000).toFixed(2) } Mh/s`

    return (
        <HashRateCardButton {...props}>
            <InfoView>
                <Title>{props.name}</Title>
                {props.hashRate ? (
                    <Subtitle>
                        {readableHashrate(props.hashRate)}
                    </Subtitle>
                ) : null}
            </InfoView>
            {props.children}
        </HashRateCardButton>
    )
}

const HashRateCardButton = styled(Button)`
    margin: 4px 24px;
    padding: 8px 12px;

    background-color: orange;
    opacity: ${({ active }) => active ? '1' : '.3'};
    border-radius: 10px;
`

const InfoView = styled.View`
    flex-direction: row;
    align-items: flex-end;
`

const Title = styled.Text`
    font-size: 24px;
    color: white;
`

const Subtitle = styled.Text`
    margin-left: 10px;

    font-size: 18px;
    color: white;
`