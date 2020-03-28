import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';
import { width, heigth } from '../Screens/constants';
import PropTypes from 'prop-types';

export default function AuthButton({ text, onPressOut }){
    return (
        <TouchableOpacity style={styles.button} onPressOut={onPressOut}>
            <Text style={styles.buttonText}> {text} </Text>
        </TouchableOpacity>
    )
};

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPressOut: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
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