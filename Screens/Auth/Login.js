import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthButton from '../../Components/AuthButton';
import AuthInput from '../../Components/AuthInput';
import useInput from '../../Hooks/useInput';

export default function Login(){
    const emailInput = useInput('');
    const handleLogin = () => {

    };
    
    return(
        <View style={styles.container}>
            <AuthInput 
                placeholder='email' 
                value={emailInput.value} 
                keyboardType='email-adress'
                onChangeText={emailInput.onChange}
            />
            <AuthButton text='request secret' onPressOut={()=>null}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });