import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import SelectPhoto from '../Screens/Photo/SelectPhoto';
import TakePhoto from '../Screens/Photo/TakePhoto';
import UploadPhoto from '../Screens/Photo/UploadPhoto';
import { NavigationContainer } from '@react-navigation/native';


export default function PhotoNav() {
  const Tab = createMaterialTopTabNavigator();
  const Stack = createStackNavigator();
  
  const PhotoTab= () => {
      return(
        <NavigationContainer independent={true}>
          <Tab.Navigator tabBarPosition='bottom'>
              <Tab.Screen name="SelectPhoto" component={SelectPhoto} />
              <Tab.Screen name="TakePhoto" component={TakePhoto} />
          </Tab.Navigator>
        </NavigationContainer>
      )
  }
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="PhotoTab" component={PhotoTab}/>
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
    </Stack.Navigator>
  );
}