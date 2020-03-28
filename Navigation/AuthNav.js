import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHome from '../Screens/Auth/AuthHome';
import Confirm from '../Screens/Auth/Confirm';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';

export default function AuthNav() {
    const authContext = useContext(AuthContext);
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthHome" headerMode='none'>
                <Stack.Screen name="AuthHome" component={AuthHome} />
                <Stack.Screen name="Confirm" component={Confirm} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};