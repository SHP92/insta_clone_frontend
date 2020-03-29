import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { StyleSheet } from 'react-native';
import AuthNav from '../Navigation/AuthNav';
import TabNav from '../Navigation/TabNav';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function NavController(){
    const Stack = createStackNavigator();
    const authContext = useContext(AuthContext);
    // const { loggedIn } = useContext(AuthContext);

    return (
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='Nav' component={authContext.loggedIn ? TabNav : AuthNav} /> 
        </Stack.Navigator>
      </NavigationContainer>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });