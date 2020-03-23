import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity } from 'react-native';
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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  // null : not check | true : check & login | false : check & logout

  const preLoad = async () => {
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

  // log-in function
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
    loaded && client && ( loggedIn !== null )? (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            { loggedIn ? 
              <TouchableOpacity onPressOut={() => setLogout()}>
                <Text> i'm in </Text> 
              </TouchableOpacity>
              : <TouchableOpacity onPressOut={() => setLogin()}>
                <Text> i'm out </Text> 
              </TouchableOpacity> 
            }
          </View>
        </ThemeProvider>
      </ApolloProvider>
    ) : (
      <AppLoading />
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
