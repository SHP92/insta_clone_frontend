import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import theme from '../theme';

export default function Loader(){
    return(
        <View style={styles.container}>
            <ActivityIndicator size='large' color={theme.blueColor}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});