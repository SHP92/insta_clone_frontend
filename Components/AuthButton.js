import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import theme from '../theme';
import { width, heigth } from '../Screens/constants';
import PropTypes from 'prop-types';

export default function AuthButton({ text, onPressOut, loading }){
    return (
        <TouchableOpacity style={styles.button} onPressOut={onPressOut} disabled={loading}>
            {loading ? 
                <ActivityIndicator color={theme.blueColor}/> 
                : <Text style={styles.buttonText}> {text} </Text>
            }
            
        </TouchableOpacity>
    )
};

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPressOut: PropTypes.func.isRequired,
    loading: PropTypes.bool,
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