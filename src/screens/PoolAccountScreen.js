import React, { useEffect } from 'react'
import { FlatList, Alert } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/Button'
import { Divider } from '../components/Divider'
import usePool from '../hooks/usePool'
import { uniqBy } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default PoolAccountScreen = ({ route, navigation }) => {
    const { id, name } = route.params
    const { pools, getPools, removeAccount } = usePool()

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getPools()
        })
        return unsub
    }, [navigation])

    const handlePress = account => () => Alert.alert(
        'Remove Account ?',
        `Are you sure you want to remove ${account.loginAccount} from ${name} monitoring?`,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => removeAccount(account.id) }
        ]
    )

    return (
        <PoolAccountView>
            <FlatList
                data={pools && uniqBy(pools[id], 'loginAccount')}
                renderItem={({ item: account }) => (
                    <>
                        <AccountView key={account.id}>
                            <TitleText>{account.loginAccount}</TitleText>
                            <RemoveButton onPress={handlePress(account)}>
                                <FontAwesomeIcon icon={faTimesCircle} color={'lightgrey'} size={24} />
                            </RemoveButton>
                        </AccountView>
                        <Divider />
                    </>
                )}
                keyExtractor={item => item.id}
            />
        </PoolAccountView>
    )
}

const PoolAccountView = styled.SafeAreaView`
    margin-top: 24px;
`

const AccountView = styled.View`
    flex-direction: row;
    margin: 0 40px;

    align-items: center;
`

const TitleText = styled.Text`
    margin-right: 24px;
`

const RemoveButton = styled(Button)`

`