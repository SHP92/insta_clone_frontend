import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AuthHome({ navigation }){
    return(
        <View style={styles.container}>
            <Text> AuthHome </Text>
            <TouchableOpacity onPressOut={() => navigation.navigate('Login')}>
                <Text> go to login </Text>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => navigation.navigate('SignUp')}>
                <Text> go to SignUp </Text>
            </TouchableOpacity>
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