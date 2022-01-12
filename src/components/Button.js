import React from 'react'
import { Platform, Pressable } from 'react-native'
import styled from 'styled-components/native'

let Button

if(Platform.OS == 'ios') {
    Button = props => (
        // <Pressable { ...props } style={res => ({ ...res, opacity: res.pressed ? .5 : 1 })} />
        <Pressable onPress={props.onPress}>
            {({ pressed }) =>
                <StyledView { ...props } pressed={pressed} />
            }
        </Pressable>
    )
} else {
    Button = props => (
        <Pressable { ...props } android_ripple={{ color: 'lightGrey' }} />
    )
}

export default Button

const StyledView = styled.View`
    opacity: ${props => props.pressed ? .5 : 1};
`