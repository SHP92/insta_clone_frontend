import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { StyleSheet } from 'react-native';
import AuthNav from '../Navigation/AuthNav';
import TabNav from '../Navigation/TabNav';

export default function NavController(){
    const authContext = useContext(AuthContext);
    // const { loggedIn } = useContext(AuthContext);

    return (
        // authContext.loggedIn ? <TabNav /> : <AuthNav />
        <TabNav />
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });