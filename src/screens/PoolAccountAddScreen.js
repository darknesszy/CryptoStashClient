import React, { useRef } from 'react'
import styled from 'styled-components/native'
import Input from '../components/Input'
import Button from '../components/Button'
import { Dimensions } from 'react-native'

export default PoolAccountAddScreen = () => {
    const inputRef = useRef(null)

    return (
        <PoolAccountAddView behavior={Platform.OS === "ios" ? "padding" : "padding"}>
            <FormView>
                <LabelText>Username</LabelText>
                <InfoInput
                    ref={inputRef}
                    // autoFocus={true}
                    placeholder="Example: Michael..."
                    textContentType="username"
                />
                <LabelText style={{ marginTop: 12 }}>Password</LabelText>
                <InfoInput
                    placeholder="Enter password here..."
                    textContentType="password"
                    secureTextEntry
                />
                <SubmitButton>
                    <ButtonText>Sign In</ButtonText>
                </SubmitButton>
            </FormView>
        </PoolAccountAddView>
    )
}

const PoolAccountAddView = styled.KeyboardAvoidingView`
    height: ${Dimensions.get('screen').height}px;

    justify-content: center;
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