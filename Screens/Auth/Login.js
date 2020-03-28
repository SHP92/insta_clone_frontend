import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AuthButton from '../../Components/AuthButton';
import AuthInput from '../../Components/AuthInput';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { useNavigation } from '@react-navigation/native';
import { LOGIN } from './AuthQueries';

export default function Login(){
    const navigation = useNavigation();
    const emailInput = useInput('');
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOGIN, {
        variables: {
            email: emailInput.value
        }
    });

    const handleLogin = async () => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (value === '') {
            return Alert.alert('please input your email adress');
        } else if (!emailRegex.test(value)){
            return Alert.alert('invalid email adress');
        }

        try {
            setLoading(true);
            const { data: { requestSecret }} = await requestSecretMutation();
            if (requestSecret){
                navigation.navigate('Confirm');
            } else {
                return Alert.alert('invalid account');
            }
        } catch (e){
            console.log(`error: ${e}`);
        } finally {
            setLoading(false);
        }
    };
    
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <AuthInput 
                    placeholder='email' 
                    value={emailInput.value} 
                    keyboardType='email-adress'
                    onChangeText={emailInput.onChange}
                    returnKeyType='send'
                    onSubmitEditing={handleLogin}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <AuthButton text='log in' onPressOut={handleLogin} loading={loading}/>
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