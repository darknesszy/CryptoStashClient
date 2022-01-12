import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'
import Input from '../components/Input'
import Button from '../components/Button'
import { UserContext } from '../components/UserProvider'
import { capitalize } from 'lodash'
import useAuth from '../hooks/useAuth'
import useBlockchain from '../hooks/useBlockchain'

export default WalletAddScreen = ({ navigation }) => {
    const inputRef = useRef(null)
    const { sub } = useContext(UserContext)
    const { post } = useAuth()
    const { blockchains } = useBlockchain()
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const [chainPicker, setChainPicker] = useState(Platform.OS == 'android')

    useEffect(() => {
        return navigation.addListener('focus', () => inputRef && inputRef.current.focus())
    }, [navigation])

    const addWallet = (owner, address, blockchainId) => Promise.resolve()
        .then(() => post(`wallets`, { address, owner, blockchain: blockchains[blockchainId] }))

    const onSubmit = data => Promise.resolve()
        .then(() => console.log(`Posting new wallet ${data['address']} to server...`))
        .then(() => addWallet(sub, data['address'], data['blockchain']))
        .then(() => navigation.goBack())

    return (
        <WalletAddView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            <FormView>
                <LabelText>Wallet Address</LabelText>
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
                    name='address'
                />
                {errors.identifier && <ErrorText>This is required.</ErrorText>}
                <LabelText>Blockchain</LabelText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            {Platform.OS == 'ios' ? (
                                <PickerButton onPress={() => setChainPicker(p => !p)}>
                                    <PickerText>
                                        {blockchains && blockchains[value] && capitalize(blockchains[value].name)}
                                    </PickerText>
                                </PickerButton>
                            ) : null}
                            <ChainPicker
                                show={chainPicker}
                                selectedValue={value}
                                onValueChange={onChange}
                            >
                                {Object.values(blockchains).map(blockchain => (
                                    <Picker.Item 
                                        key={blockchain.id} 
                                        label={capitalize(blockchain.name)}
                                        value={blockchain.id} 
                                    />
                                ))}
                            </ChainPicker>
                        </>
                    )}
                    defaultValue={1}
                    name='blockchain'
                />
                <SubmitButton disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
                    <ButtonText>Add Account</ButtonText>
                </SubmitButton>
            </FormView>
        </WalletAddView>
    )
}

const WalletAddView = styled.KeyboardAvoidingView`
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

const ChainPickerBase = styled(Picker)`

`

const ChainPicker = Platform.OS == 'ios'
    ? styled(ChainPickerBase)`
        display: ${({ show }) => show ? 'flex': 'none'};

        border-bottom-color: lightgrey;
        border-bottom-width: 1px;
        border-style: solid;
    `
    : styled(ChainPickerBase)`
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