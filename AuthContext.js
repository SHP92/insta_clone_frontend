import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext();
export const AuthProvider = ({ children, loggedIn:loggedInProps }) => {
    const [loggedIn, setLoggedIn] = useState(loggedInProps);
    // null : not check | true : check & login | false : check & logout

    const setLogin = async () => {
        try {
          await AsyncStorage.setItem('loggedIn', 'true');
          setLoggedIn(true);
        } catch (error) {
          console.log(error);
        }
      };
      const setLogout = async () => {
        try {
          await AsyncStorage.setItem('loggedIn', 'false');
          setLoggedIn(false);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        // 나중에 useContext로 context를 사용하게 되면, provider를 통해 넘겨준 value가 props 개념으로 전달됨
        <AuthContext.Provider value={{ loggedIn, setLogin, setLogout }}>
            { children }
        </AuthContext.Provider>
    )
}