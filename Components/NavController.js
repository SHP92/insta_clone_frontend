import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { StyleSheet, View } from 'react-native';
import AuthNav from '../Navigation/AuthNav';
import TabNav from '../Navigation/TabNav';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoNav from '../Navigation/PhotoNav';
import MessageLink from './MessageLink';


export default function NavController(){
    const Stack = createStackNavigator();
    const authContext = useContext(AuthContext);
    // const { loggedIn } = useContext(AuthContext);

    return (
      <NavigationContainer>
        <Stack.Navigator headerMode='none' initialRouteName='Nav' mode='modal' >
          <Stack.Screen name='Nav' component={authContext.loggedIn ? TabNav : AuthNav} /> 
          <Stack.Screen name='PhotoNav' component={PhotoNav}/>
          <Stack.Screen name='MessageLink' component={MessageLink}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
};
