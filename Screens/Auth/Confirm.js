import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import AuthButton from '../../Components/AuthButton';
import AuthInput from '../../Components/AuthInput';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { CONFIRM_SECRET } from './AuthQueries';
import { useLogin } from '../../AuthContext';

export default function Confirm({ route }){
    const [loading, setLoading] = useState(false);
    const confirmInput = useInput('');
    const logIn = useLogin();
    const { email } = route.params;
    const { value } = confirmInput;
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables : {
            email: email,
            secret: value
        }
    });
    
    const handleConfirm = async () => {
        if (value === '' || !value.includes(' ')) {
            return Alert.alert('invalid key')
        };
        
        try {
            setLoading(true);
            const { data : {confirmSecret} } = await confirmSecretMutation();
            if (confirmSecret !== '' || confirmSecret !== false){
                logIn(confirmSecret);
                console.log("success")
            } else {
                Alert.alert('authorization failed');
            }
        } catch (e) {
            console.log(e);
            Alert.alert('please try again');
        } finally {
            setLoading(false);
        }
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <AuthInput 
                    placeholder='secret key' 
                    value={confirmInput.value} 
                    onChangeText={confirmInput.onChange}
                    returnKeyType='send'
                    onSubmitEditing={handleConfirm}
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='default'
                />
                <AuthButton text='confirm secret' onPressOut={handleConfirm} loading={loading}/>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });