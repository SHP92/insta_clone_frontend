import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AuthButton from '../../Components/AuthButton';
import AuthInput from '../../Components/AuthInput';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { useNavigation } from '@react-navigation/native';
import { CREATE_ACCOUNT } from './AuthQueries';

export default function SignUp({ route }){
    const navigation = useNavigation();
    const firstNameInput = useInput('');
    const lastNameInput = useInput('');
    const emailInput = useInput(route.params?.email ?? '');
    const userNameInput = useInput('');
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            name: userNameInput.value,
            email: emailInput.value
        }
    })

    const handleSignup = async () => {
        const { value: firstName } = firstNameInput;
        const { value: lastName } = lastNameInput;
        const { value: email } = emailInput;
        const { value: userName } = userNameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (firstName === '' || lastName === '' || userName === '' || email === '') {
            return Alert.alert('please fill your information')
        } else if (!emailRegex.test(email)) {
            return Alert.alert('invalid email adress')
        }

        try {
            setLoading(true);
            const { data: { createAccount }} = await createAccountMutation();
            if (createAccount) {
                Alert.alert('successfully signed up');
                navigation.navigate('Login', { email });
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <AuthInput 
                    placeholder='first name' 
                    value={firstNameInput.value} 
                    keyboardType='default'
                    onChangeText={firstNameInput.onChange}
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <AuthInput 
                    placeholder='last name' 
                    value={lastNameInput.value} 
                    keyboardType='default'
                    onChangeText={lastNameInput.onChange}
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <AuthInput 
                    placeholder='email' 
                    value={emailInput.value} 
                    keyboardType='email-adress'
                    onChangeText={emailInput.onChange}
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <AuthInput 
                    placeholder='user name' 
                    value={userNameInput.value} 
                    keyboardType='default'
                    onChangeText={userNameInput.onChange}
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize='none'
                    onSubmitEditing={handleSignup}
                />
                <AuthButton text='sign up' onPressOut={handleSignup} loading={loading}/>
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