import React, { useContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'
import Input from '../components/Input'
import Button from '../components/Button'
import { UserContext } from '../components/UserProvider'
import { capitalize } from 'lodash'
import useAuth from '../hooks/useAuth'

export default ServiceApiAddScreen = ({ navigation }) => {
    const { sub } = useContext(UserContext)
    const { get, post } = useAuth()
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const [providers, setProviders] = useState([])
    const [typePicker, setTypePicker] = useState(Platform.OS == 'android')
    const [currencyPicker, setCurrencyPicker] = useState(Platform.OS == 'android')

    useEffect(() => {
        loadProvider(1)
    }, [])

    const loadProvider = value => {
        if (value == 1) {
            get('currencyexchanges')
                .then(exchanges => setProviders(exchanges))
        }
    }

    const addExchangeAccount = (owner, name, publicKey, privateKey, currencyExchange) => Promise.resolve()
        .then(() => post(
            `exchangeaccounts`, 
            { 
                owner,
                name,
                currencyExchange,
                exchangeAccountApiKey: {
                    publicKey, privateKey
                }
            }
        ))

    const onSubmit = data => Promise.resolve()
        .then(() => console.log(`Posting new service api`, data))
        .then(() => {
            if(data['type'] == 1) {
                return addExchangeAccount(sub, data['name'], data['key'], data['secret'], providers[data['provider']])
            }
        })
        .then(() => navigation.goBack())

    return (
        <ServiceApiAddView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <FormView>
                <LabelText>Service Type</LabelText>
                <Controller
                    control={control}
                    defaultValue={1}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            {Platform.OS == 'ios' ? (
                                <PickerButton onPress={() => setTypePicker(p => !p)}>
                                    <PickerText>{'Currency Exchange'}</PickerText>
                                </PickerButton>
                            ) : null}
                            <CurrencyPicker
                                def
                                show={typePicker}
                                selectedValue={value}
                                onValueChange={(itemValue, itemIndex) => {
                                    loadProvider(itemValue)
                                    onChange(itemValue, itemIndex)
                                }}
                            >
                                <Picker.Item label='Currency Exchange' value={1} />
                            </CurrencyPicker>
                        </>
                    )}
                    defaultValue={1}
                    name='type'
                />
                <LabelText>Service Provider</LabelText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            {Platform.OS == 'ios' ? (
                                <PickerButton onPress={() => setCurrencyPicker(p => !p)}>
                                    <PickerText>
                                        {providers[value] && capitalize(providers[value].name)}
                                    </PickerText>
                                </PickerButton>
                            ) : null}
                            <CurrencyPicker
                                show={currencyPicker}
                                selectedValue={value}
                                onValueChange={onChange}
                                enabled={providers.length != 0}
                            >
                                {providers.map(provider => 
                                    <Picker.Item 
                                        key={provider.id} 
                                        label={capitalize(provider.name)}
                                        value={provider.id} 
                                    />
                                )}
                            </CurrencyPicker>
                        </>
                    )}
                    defaultValue={0}
                    name='provider'
                />
                <LabelText>Name</LabelText>
                <Controller
                    control={control}
                    // defaultValue={'Binance1'}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InfoInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name='name'
                />
                {errors.name && <ErrorText>This is required.</ErrorText>}
                <LabelText>Public Key</LabelText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InfoInput
                            value={value}
                            placeholder='usually the wallet address...'
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name='key'
                />
                {errors.key && <ErrorText>This is required.</ErrorText>}
                <LabelText>Secret</LabelText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InfoInput
                            value={value}
                            placeholder='usually the wallet address...'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            secureTextEntry
                        />
                    )}
                    name='secret'
                />
                {errors.secret && <ErrorText>This is required.</ErrorText>}
                <SubmitButton disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
                    <ButtonText>Add API</ButtonText>
                </SubmitButton>
            </FormView>
        </ServiceApiAddView>
    )
}

const ServiceApiAddView = styled.KeyboardAvoidingView`
    flex: 1;
`

const FormView = styled.ScrollView`
    padding: 0 24px;
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

const CurrencyPickerBase = styled(Picker)`
    
`

const CurrencyPicker = Platform.OS == 'ios'
    ? styled(CurrencyPickerBase)`
        z-index: 1;
        display: ${({ show }) => show ? 'flex': 'none'};
        border-bottom-color: lightgrey;
        border-bottom-width: 1px;
        border-style: solid;
    `
    : styled(CurrencyPickerBase)`
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