import React, { useEffect, useState } from 'react'
import config from 'react-native-config'
import styled from 'styled-components/native'
import Button from '../components/Button'
import useUser from '../hooks/useUser'

export default DrawerScreen = ({ navigation }) => {
    const { isLoggedIn } = useUser()

    return (
        <DrawerView>
            <UserView>
                <Icon />
                {isLoggedIn
                    ? (
                        <UserInfoView>
                            <UsernameText>Michael</UsernameText>
                            <UserSubText>User since {new Date().toString()}</UserSubText>
                        </UserInfoView>
                    )
                    : (
                        <LoginButton onPress={() =>
                            navigation.navigate('Authentication')
                        }>
                            <MenuText>Login / Register</MenuText>
                        </LoginButton>
                    )
                }
            </UserView>
            <MenuButton>
                <MenuText>Settings</MenuText>
            </MenuButton>
            <MenuButton>
                <MenuText>Help & feedback</MenuText>
            </MenuButton>
            {isLoggedIn ? (
                <MenuButton>
                    <MenuText>Log out</MenuText>
                </MenuButton>
            ) : null}
        </DrawerView>
    )
}

const DrawerView = styled.View`
    margin-top: 24px;
    padding: 0 24px;
`

const UserView = styled.View`
    flex-direction: row;
    align-items: center;
`

const UserInfoView = styled.View`
    margin: 12px;
`

const Icon = styled.View`
    background-color: grey;
    height: 40px;
    width: 40px;
`
const LoginButton = styled(Button)`
    margin: 12px;
`

const UsernameText = styled.Text`
    font-size: 24px;
`

const UserSubText = styled.Text`
    font-size: 12px;
`

const MenuButton = styled(Button)`

`

const MenuText = styled.Text`
    font-size: 18px;
    margin: 12px 0;
`