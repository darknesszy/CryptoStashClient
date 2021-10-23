import React from 'react'
import { Platform, Pressable } from 'react-native'

let Button

if(Platform.OS == 'ios') {
    Button = props => (
        <Pressable { ...props } style={({ pressed }) => ({ opacity: pressed ? .5 : 1 })} />
    )
} else {
    Button = props => (
        <Pressable { ...props } android_ripple={{ color: 'lightGrey' }} />
    )
}

export default Button