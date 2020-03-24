import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav';
import PhotoNav from './PhotoNav';
import MessageNav from './MessageNav';

export default function AuthNav() {
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator headerMode='none' mode='modal'>
                <Stack.Screen name="TabNav" component={TabNav} />
                <Stack.Screen name="PhotoNav" component={PhotoNav} />
                <Stack.Screen name="MessageNav" component={MessageNav} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });