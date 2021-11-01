import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

export const TestScreen1 = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableHighlight onPress={() => navigation.push('Test2')}>
                <Text>Test Screen 1</Text>
            </TouchableHighlight>
        </View>
    )
}

export const TestScreen2 = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Test  Screen 2</Text>
        </View>
    )
}

export const TestScreen3 = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Test Screen 3</Text>
        </View>
    )
}