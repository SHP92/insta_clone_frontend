import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Loader from '../Components/Loader';

export default function Home(){
    return(
        <View style={styles.container}>
            <Text> Home </Text>
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