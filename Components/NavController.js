import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { StyleSheet } from 'react-native';
import AuthNav from '../Navigation/AuthNav';
import TabNav from '../Navigation/TabNav';
import { NavigationContainer } from '@react-navigation/native';

export default function NavController(){
    const authContext = useContext(AuthContext);
    // const { loggedIn } = useContext(AuthContext);

    return (
      <NavigationContainer>
        {authContext.loggedIn ? <TabNav /> : <AuthNav />}
      </NavigationContainer>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });