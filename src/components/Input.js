import React, { forwardRef, useState } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

let Input

if(Platform.OS == 'ios') {
    Input = props => (
        <IOSInput { ...props } />
    )
} else {
    Input = forwardRef((props, ref) => {
        const [isActive, setIsActive] = useState()

        return (
            <AndroidInput
                ref={ref}
                { ...props }
                isActive={isActive}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
            />
        )
    })
}

export default Input

const BaseInput = styled.TextInput`
    margin: 0;
    padding: 0 8px;

    border-color: lightgrey;
`

const IOSInput = styled(BaseInput)`
    border: 1px solid lightgrey;
`

const AndroidInput = styled(BaseInput)`
    background-color: lightgrey;

    border-color: ${props => props.isActive ? 'blue' : 'grey'};
    border-bottom-width: 2px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`