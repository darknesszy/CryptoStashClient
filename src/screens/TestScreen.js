import React, { useEffect, useState } from 'react'
import { TouchableHighlight, View } from 'react-native'
import styled from 'styled-components/native'

export default TestScreen = ({ navigation }) => {

    useEffect(() => {
        const unsub = navigation.addListener("state", () => 
            {
                console.log('@TEST', navigation.getState())
                console.log('@TEST', navigation.getParent())
            }
        )
        return unsub
    }, [navigation])

    return (
        <HomeView>
            <TouchableHighlight onPress={() => navigation.goBack()}>
                <View>
                    <TitleText>
                        Test Screen2
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