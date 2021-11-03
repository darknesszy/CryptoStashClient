import React, { useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components/native'
import Input from '../components/Input'
import Button from '../components/Button'

export default PoolAccountAddScreen = ({ route, navigation }) => {
    const { id, name } = route.params
    const inputRef = useRef(null)
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    useEffect(() => {
        return navigation.addListener('focus', () => inputRef && inputRef.current.focus())
    }, [navigation])

    const onSubmit = data => Promise.resolve()
        .then(() => console.log(`Posted new account ${data['accountLogin']} to server...`))
        .then(() => navigation.goBack())

    return (
        <PoolAccountAddView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            <FormView>
                <LabelText>Account Login</LabelText>
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
                            placeholder='usually the wallet address'
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                    name='accountLogin'
                />
                {errors.firstName && <ErrorText>This is required.</ErrorText>}
                <SubmitButton disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
                    <ButtonText>Add Account</ButtonText>
                </SubmitButton>
            </FormView>
        </PoolAccountAddView>
    )
}

const PoolAccountAddView = styled.KeyboardAvoidingView`
    margin-top: 24px;
    height: ${Dimensions.get('screen').height}px;
    align-items: center;
`

const FormView = styled.View`
    width: 65%;
`

const InfoInput = styled(Input)`
    font-size: 18px;
    padding: 8px;
`

const LabelText = styled.Text`
    padding: 0 5px;
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

const ButtonText = styled.Text`
    color: white;
    margin: 12px;
`

const CancelButton = styled(Button)`
    position: absolute;
    right: 24px;
    top: 24px;
    font-size: 120px;
`