import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import theme from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar(value, onChange, onSubmit){
    return(
        <View style={styles.container}>
            <Ionicons name='ios-search' size={20} color={theme.darkGreyColor} style={{paddingHorizontal:5}}/> 
            <TextInput 
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                placeholder='search'
                returnKeyType='search'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.backgruondGreyColor,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: Dimensions.get('screen').width *0.95,
        // justifyContent: 'center',
        alignItems: 'center',
    },
});