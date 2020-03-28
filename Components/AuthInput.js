import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../theme';
import { width } from '../Screens/constants';

export default function AuthInput({ placeholder, value, keyboardType='defalut', onChangeText }){
    return(
        <View style={styles.container}>
            <TextInput 
                placeholder={placeholder} 
                value={value} 
                keyboardType={keyboardType} 
                style={styles.input}
                onChangeText={onChangeText}
            >
                
            </TextInput>
        </View>
    )
};

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.oneOf([
        'default', 'numeric', 'email-address'
    ]),
    onChangeText: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    input: {
        backgroundColor: theme.greyColor,
        width: width*0.7,
        padding: 10,
        borderBottomColor: theme.darkGreyColor,
        borderBottomWidth: 1,
    },
    text: {

    },
});