import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { StyleSheet } from 'react-native';
import AuthNav from '../Navigation/AuthNav';
import MainNav from '../Navigation/MainNav';

export default function NavController(){
    const authContext = useContext(AuthContext);
    // const { loggedIn } = useContext(AuthContext);

    return (
        // authContext.loggedIn ? <TabNav /> : <AuthNav />
        <AuthNav />
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });