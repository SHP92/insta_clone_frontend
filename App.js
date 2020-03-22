import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require('./assets/logo.png')]);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    preLoad()
  }, []);

  return (
    loaded ? (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    ) : (
      <AppLoading />
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
