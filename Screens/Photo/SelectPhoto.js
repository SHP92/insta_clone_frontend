import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SelectPhoto({ navigation }){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPressOut={() => navigation.navigate('UploadPhoto')}>
                <Text> SelectPhoto </Text>
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