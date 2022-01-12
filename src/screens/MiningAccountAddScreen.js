import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, Platform } from 'react-native'
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
    const { load, addAccount } = useContext(MiningContext)
    const { sub } = useContext(UserContext)

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const { pools } = usePool()

    const [poolPicker, setPoolPicker] = useState(Platform.OS == 'android')

    useEffect(() => {
        return navigation.addListener('focus', () => inputRef && inputRef.current.focus())
    }, [navigation])

    const onSubmit = data => Promise.resolve()
        .then(() => console.log(`Posting new account ${data['identifier']} ${data['pool']} to server...`))
        .then(() => addAccount(pools[data['pool']], sub, data['identifier']))
        .then(() => load())
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
                        <>
                            {Platform.OS == 'ios' ? (
                                <PickerButton onPress={() => setPoolPicker(p => !p)}>
                                    <PickerText>{pools && pools[value] && `${capitalize(pools[value].name)} Pool`}</PickerText>
                                </PickerButton>
                            ) : null}
                            <PoolPicker
                                show={poolPicker}
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
                        </>
                    )}
                    defaultValue={1}
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

const LabelTextBase = styled.Text`
    padding: 24px 5px 0 0;
`

const LabelText = Platform.OS == 'ios'
    ? styled(LabelTextBase)`
        padding: 24px 12px 4px 12px;
        color: grey;
    `
    : styled(LabelTextBase)`
        padding: 24px 5px 0 0;
    `

const ErrorText = styled.Text`

`

const SubmitButtonBase = styled(Button)`
    margin-top: 24px;

    justify-content: center;
    align-items: center;
`

const SubmitButton = Platform.OS == 'ios'
    ? styled(SubmitButtonBase)`

    `
    : styled(SubmitButtonBase)`
        background-color: blue;
        border-radius: 5px;
    `

const ButtonTextBase = styled.Text`
    color: white;
    margin: 12px;
`

const ButtonText = Platform.OS == 'ios'
    ? styled(ButtonTextBase)`
        font-size: 18px;
        color: #007AFF;
    `
    : styled(ButtonTextBase)`
        color: white;
    `

const PoolPickerBase = styled(Picker)`

`

const PoolPicker = Platform.OS == 'ios'
    ? styled(PoolPickerBase)`
        display: ${({ show }) => show ? 'flex': 'none'};
        border-bottom-color: lightgrey;
        border-bottom-width: 1px;
        border-style: solid;
    `
    : styled(PoolPickerBase)`
        background-color: lightgrey;
    `

const PickerButton = styled(Button)`
    border-bottom-color: lightgrey;
    border-bottom-width: 1px;
    border-style: solid;
`

const PickerText = styled.Text`
    margin: 8px 0;

    font-size: 18px;
    color: #007AFF;
`