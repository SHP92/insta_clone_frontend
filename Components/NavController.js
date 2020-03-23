import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

export default function NavController(){
    const authContext = useContext(AuthContext);
    // const { loggedIn } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            { authContext.loggedIn ? 
                <TouchableOpacity onPressOut={() => authContext.setLogout()}>
                    <Text> click to logout </Text> 
                </TouchableOpacity>
                : <TouchableOpacity onPressOut={() => authContext.setLogin()}>
                    <Text> click to login </Text> 
                </TouchableOpacity> 
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });