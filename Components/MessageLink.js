import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function MessageLink(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Text>MessageLink</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingRight: 20,
    },
})