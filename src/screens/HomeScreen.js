import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

export default HomeScreen = ({ navigation }) => {

    return (
        <HomeView>
            <TitleText>Home Screen</TitleText>
        </HomeView>
    )
}

const HomeView = styled.View`
    margin: 24px;
`

const TitleText = styled.Text`
    font-size: 24px;
`