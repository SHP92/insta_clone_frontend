import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Confirm(){
    return(
        <View style={styles.container}>
            <Text> Confirm </Text>
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