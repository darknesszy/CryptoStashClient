import React, { useContext, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'
import Input from '../components/Input'
import Button from '../components/Button'
import { UserContext } from '../components/UserProvider'
import { capitalize } from 'lodash'
import useCurrency from '../hooks/useCurrency'
import useAuth from '../hooks/useAuth'

export default WalletAddScreen = ({ navigation }) => {
    const inputRef = useRef(null)
    const { sub } = useContext(UserContext)
    const { post } = useAuth()
    const { currencies } = useCurrency()
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    useEffect(() => {
        return navigation.addListener('focus', () => inputRef && inputRef.current.focus())
    }, [navigation])

    const addWallet = (owner, address, currencyId) => Promise.resolve()
        .then(() => post(`wallets`, { address, owner, currency: currencies[currencyId] }))

    const onSubmit = data => Promise.resolve()
        .then(() => console.log(`Posted new wallet ${data['address']} ${data['currency']} to server...`))
        .then(() => addWallet(sub, data['address'], data['currency']))
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
                <LabelText>Currency</LabelText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CurrencyPicker
                            selectedValue={value}
                            onValueChange={onChange}
                        >
                            {Object.values(currencies).map(currency => (
                                <Picker.Item 
                                    key={currency.id} 
                                    label={capitalize(currency.name)}
                                    value={currency.id} 
                                />
                            ))}
                        </CurrencyPicker>
                    )}
                    name='currency'
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

const CurrencyPicker = styled(Picker)`
    background-color: lightgrey;
`

const ButtonText = styled.Text`
    color: white;
    margin: 12px;
`