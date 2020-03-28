import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { width, height } from '../constants';
import theme from '../../theme';
import AuthButton from '../../Components/AuthButton';

export default function AuthHome({ navigation }){
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.image} resizeMode='contain'/>
            <View>
                <TouchableOpacity style={styles.button} onPressOut={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}> login </Text>
                </TouchableOpacity>
                <AuthButton text='create new account' onPressOut={()=>navigation.navigate('SignUp')}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: width*0.7,
        marginBottom: 10,
    },
    button: {
        backgroundColor: theme.blueColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: width*0.7,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
  });