import React, { useEffect, useState } from 'react'
import { TouchableHighlight, View } from 'react-native'
import styled from 'styled-components/native'

export default HomeScreen = ({ navigation }) => {

    useEffect(() => {
        const unsub = navigation.addListener("state", () => 
            {
                console.log('@HOME', navigation.getState())
                console.log('@HOME', navigation.getParent())
            }
        )
        return unsub
    }, [navigation])

    return (
        <HomeView>
            <TouchableHighlight onPress={() => navigation.push('Test')}>
                <View>
                    <TitleText>
                        Home Screen
                    </TitleText>
                </View>
            </TouchableHighlight>

        </HomeView>
    )
}

const HomeView = styled.View`
    margin: 24px;
`

const TitleText = styled.Text`
    font-size: 24px;
`

const TestButton = styled.TouchableHighlight`

`