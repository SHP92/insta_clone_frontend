import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../theme';
import { width } from '../Screens/constants';

export default function AuthInput({ 
    placeholder, value, keyboardType='defalut', onChangeText, returnKeyType='done', onSubmitEditing, autoCorrect=false, autoCapitalize='none'
    }){
    return(
        <View style={styles.container}>
            <TextInput 
                placeholder={placeholder} 
                value={value} 
                keyboardType={keyboardType} 
                style={styles.input}
                onChangeText={onChangeText}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
            >
                
            </TextInput>
        </View>
    )
};

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.oneOf([
        'characters', 'none'
    ]),
    keyboardType: PropTypes.oneOf([
        'default', 'numeric', 'email-address'
    ]),
    returnKeyType: PropTypes.oneOf([
        'done', 'go', 'next', 'search', 'send'
    ]),
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