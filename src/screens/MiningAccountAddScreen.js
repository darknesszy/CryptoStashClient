import React, { useContext, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'
import Input from '../components/Input'
import Button from '../components/Button'
import usePool from '../hooks/usePool'
import { UserContext } from '../components/UserProvider'
import { capitalize } from 'lodash'
import { MiningContext } from '../components/MiningProvider'

export default MiningAccountAddScreen = ({ navigation }) => {
    const inputRef = useRef(null)
    const { getAccounts, addAccount } = useContext(MiningContext)
    const { sub } = useContext(UserContext)

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const { pools } = usePool()

    useEffect(() => {
        return navigation.addListener('focus', () => inputRef && inputRef.current.focus())
    }, [navigation])

    const onSubmit = data => Promise.resolve()
        .then(() => console.log(`Posted new account ${data['identifier']} ${data['pool']} to server...`))
        .then(() => addAccount(data['pool'], sub, data['identifier']))
        .then(() => getAccounts())
        .then(() => navigation.goBack())

    return (
        <MiningAccountAddView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            <FormView>
                <LabelText>Account Identifier</LabelText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InfoInput
                            ref={inputRef}
                            autoFocus={true}
                            value={value}
                            placeholder='usually the wallet address...'
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name='identifier'
                />
                {errors.identifier && <ErrorText>This is required.</ErrorText>}
                <LabelText>Mining Pool</LabelText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PoolPicker
                            selectedValue={value}
                            onValueChange={onChange}
                        >
                            {Object.values(pools).map(pool => (
                                <Picker.Item 
                                    key={pool.id} 
                                    label={`${capitalize(pool.name)} Pool`}
                                    value={pool.id} 
                                />
                            ))}
                        </PoolPicker>
                    )}
                    name='pool'
                />
                <SubmitButton disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
                    <ButtonText>Add Account</ButtonText>
                </SubmitButton>
            </FormView>
        </MiningAccountAddView>
    )
}

const MiningAccountAddView = styled.KeyboardAvoidingView`
    margin: 24px;
    height: ${Dimensions.get('screen').height}px;
    align-items: center;
`

const FormView = styled.View`
    width: 100%;
`

const InfoInput = styled(Input)`
    font-size: 18px;
    padding: 8px;
`

const LabelText = styled.Text`
    padding: 24px 5px 0 0;
`

const ErrorText = styled.Text`

`

const SubmitButton = styled(Button)`
    margin-top: 24px;

    justify-content: center;
    align-items: center;
    background-color: blue;

    border-radius: 5px;
`

const PoolPicker = styled(Picker)`
    background-color: lightgrey;
`

const ButtonText = styled.Text`
    color: white;
    margin: 12px;
`