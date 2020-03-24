import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import SelectPhoto from '../Screens/Photo/SelectPhoto';
import TakePhoto from '../Screens/Photo/TakePhoto';
import UploadPhoto from '../Screens/Photo/UploadPhoto';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function PhotoTab(){
    return(
        <Tab.Navigator tabBarPosition='bottom'>
            <Tab.Screen name="SelectPhoto" component={SelectPhoto} />
            <Tab.Screen name="TakePhoto" component={TakePhoto} />
        </Tab.Navigator>
    )
}

export default function PhotoNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={PhotoTab}/>
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
    </Stack.Navigator>
  );
}