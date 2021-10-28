import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import Button from '../components/Button'
import { UserContext } from '../components/UserProvider'

export default DrawerScreen = ({ navigation }) => {
    // const { signin, signout, sub, preferred_username } = useUser()
    const { signin, signout, sub, preferred_username } = useContext(UserContext)

    return (
        <DrawerView>
            <UserView>
                <Icon />
                {sub
                    ? (
                        <UserInfoView>
                            <UsernameText>{preferred_username}</UsernameText>
                            <UserSubText>User since {new Date().toString()}</UserSubText>
                        </UserInfoView>
                    )
                    : (
                        <LoginButton onPress={signin}>
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
            {sub ? (
                <MenuButton onPress={signout}>
                    <MenuText>Log out</MenuText>
                </MenuButton>
            ) : null}
        </DrawerView>
    )
}

const DrawerView = styled(DrawerContentScrollView)`
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