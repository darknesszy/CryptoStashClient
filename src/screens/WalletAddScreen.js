import React, { useContext, useEffect, useRef } from 'react'
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
                        <CurrencyPicker
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
                        </CurrencyPicker>
                    )}
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