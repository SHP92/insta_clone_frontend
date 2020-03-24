import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MessageLink(){
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('MessageNav')}>
            <Text> MessageLink </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
       
    },
})