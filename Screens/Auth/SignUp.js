import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import AuthButton from '../../Components/AuthButton';
import AuthInput from '../../Components/AuthInput';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { useNavigation } from '@react-navigation/native';
import { CREATE_ACCOUNT } from './AuthQueries';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../theme';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import key from '../../key';

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
    const facebookLogin = async() => {
        try {
            await Facebook.initializeAsync(key.FACEBOOK_KEY);
            const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
            setLoading(true);
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`);
            
            const {first_name, last_name, email } = await response.json();
            firstNameInput.setValue(first_name);
            lastNameInput.setValue(last_name);
            emailInput.setValue(email);

            Alert.alert('Logged in!', `Hi ${first_name}!`);
            setLoading(false);

            } else {
            // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    };
    const googleLogin = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: key.GOOGLE_ANDROID_KEY,
            iosClientId: key.GOOGLE_IOS_KEY,
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            let userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${result.accessToken}` },
            });
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: e };
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
                <View style={styles.line}>

                </View>
                <AuthButton text='connect FACEBOOK' onPressOut={facebookLogin} loading={false} color='#3b5998'/>
                <AuthButton text='connect GOOGLE' onPressOut={googleLogin} loading={false} color='#DB4437'/>
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
    line: {
        borderColor: theme.darkGreyColor,
        borderWidth: 0.5,
        width: Dimensions.get('screen').width*0.8,
        marginTop: 30,
        marginBottom: 40,
    },
  });