import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { apolloClientOptions } from './apollo';
import { ApolloProvider } from 'react-apollo-hooks';

import { AuthProvider } from './AuthContext';
import NavController from './Components/NavController';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  // null : not check | true : check & login | false : check & logout

  const preLoad = async () => {
    // await AsyncStorage.clear();
    try {
      // preload assets
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require('./assets/logo.png')]);
      setLoaded(true);

      // storage cache (local storage)
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });
      setClient(client);

      // check log-in
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if ( loggedIn === null || loggedIn === 'false' ) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    preLoad()
  }, []);

  return (
    loaded && client && (loggedIn !== null) ? (
      <ApolloProvider client={client}>
        {/* <StatusBar hidden/> */}
        <ThemeProvider theme={theme}>
          {/* Context를 사용하려면 context provider로 감싸줘야함 AuthContet.Provider (AuthProvider) */}
          <AuthProvider loggedIn={loggedIn}>
            <NavController />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    ) : (
      <AppLoading />
    )
  );
}
