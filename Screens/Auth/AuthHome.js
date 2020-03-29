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
                <AuthButton text='log in' onPressOut={()=>navigation.navigate('Login')}/>
                <TouchableOpacity style={styles.button} onPressOut={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}> create new account </Text>
                </TouchableOpacity>
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        width: width*0.7,
        borderRadius: 5,
        borderColor: theme.blueColor,
        borderWidth: 1,
    },
    buttonText: {
        color: theme.blueColor,
        fontSize: 20,
    },
  });