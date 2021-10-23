import React, { useEffect, useState } from 'react'
import config from 'react-native-config'
import styled from 'styled-components/native'

export default AndroidDrawerScreen = () => {
    return (
        <DrawerView>
            <MainText>
                Drawer Menu
            </MainText>
        </DrawerView>
    )
}

const DrawerView = styled.SafeAreaView`
    margin: 10px;
`

const MainText = styled.Text`

`