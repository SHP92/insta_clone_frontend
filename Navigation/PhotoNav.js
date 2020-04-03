import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import SelectPhoto from '../Screens/Photo/SelectPhoto';
import TakePhoto from '../Screens/Photo/TakePhoto';
import UploadPhoto from '../Screens/Photo/UploadPhoto';
import { NavigationContainer } from '@react-navigation/native';
import theme from '../theme';
import { Ionicons } from '@expo/vector-icons';


export default function PhotoNav() {
  const Tab = createMaterialTopTabNavigator();
  const Stack = createStackNavigator();
  
  const PhotoTab= () => {
      return(
        <NavigationContainer independent={true}>
          <Tab.Navigator 
            tabBarPosition='bottom' 
            tabBarOptions={{
              indicatorStyle:{backgroundColor:'white'},
              tabStyle:{backgroundColor:theme.backgruondGreyColor},
            }}
          >
              <Tab.Screen 
                name="SelectPhoto" component={SelectPhoto} 
                options={{
                  tabBarLabel:({focused, color})=>(
                    <Text style={{
                      fontWeight: focused ? 'bold': null,
                      color: focused ? color : theme.darkGreyColor,
                    }}>SELECT</Text>
                  )
                }}
              />
              <Tab.Screen 
                name="TakePhoto" component={TakePhoto} 
                options={{
                  tabBarLabel:({focused, color})=>(
                    <Text style={{
                      fontWeight: focused ? 'bold': null,
                      color: focused ? color : theme.darkGreyColor,
                    }}>TAKE</Text>
                  )
                }}
              />
          </Tab.Navigator>
        </NavigationContainer>
      )
  }
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="PhotoTab" component={PhotoTab} options={{
        headerTitle:()=><Ionicons name='ios-camera' size={30}/>
      }}/>
    </Stack.Navigator>
  );
}