import React, { useContext, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components/native'
import Input from '../components/Input'
import Button from '../components/Button'
import usePool from '../hooks/usePool'
import { UserContext } from '../components/UserProvider'

export default MiningAccountAddScreen = ({ route, navigation }) => {
    const inputRef = useRef(null)
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const { addAccount } = usePool()
    const { sub } = useContext(UserContext)

    useEffect(() => {
        return navigation.addListener('focus', () => inputRef && inputRef.current.focus())
    }, [navigation])

    const onSubmit = data => Promise.resolve()
        .then(() => console.log(`Posted new account ${data['identifier']} ${id} to server...`))
        .then(() => addAccount(id, sub, data['identifier']))
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