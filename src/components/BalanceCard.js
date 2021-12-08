import React, { useState } from 'react'
import styled from 'styled-components/native'
import Button from './Button'

export default BalanceCard = props => {
    const digits = (num, count = 0) => {
        if (num) {
            return digits(Math.floor(num / 10), ++count)
        }
        return count
    }

    return (
        <BalanceCardButton {...props}>
            <PrimaryView>
                <IconView>
                    {props.icon ? (
                        <Icon source={props.icon} />
                    ) : null}
                    <TickerText>{props.ticker}</TickerText>

                </IconView>
                <Subtitle>
                    {props.balance.toFixed(10 - digits(props.balance))}
                </Subtitle>
            </PrimaryView>
            <SecondaryView>
                <NameText>{props.name}</NameText>
            </SecondaryView>
            {props.children}
        </BalanceCardButton>
    )
}

const BalanceCardButton = styled(Button)`
    margin: 4px 24px;
    padding: 8px 12px;

    opacity: ${({ disabled }) => disabled ? '.3' : '1'};
    border: solid 1.5px ${({ selected }) => selected || 'orange'};
    border-radius: 10px;
    background-color: ${({ selected }) => selected || 'transparent'};
`

const PrimaryView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`

const SecondaryView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`

const TickerText = styled.Text`
    font-size: 24px;
    color: darkgrey;
`

const NameText = styled.Text`
    font-size: 12px;
    color: grey;
`

const Subtitle = styled.Text`
    margin-left: 10px;

    font-size: 18px;
    color: darkgrey;
`

const IconView = styled.View`
    flex-direction: row;
    align-items: center;
`

const Icon = styled.Image`
    width: 24px;
    height: 24px;
    margin-right: 4px;
`