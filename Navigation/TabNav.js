import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Search from '../Screens/Search';
import Notifications from '../Screens/Notifications';

const Tab = createBottomTabNavigator();

export default function TabNav({ navigation }){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
                {/* add blank(fake) screen using View */}
            <Tab.Screen 
                name="Add" 
                component={View} 
                listeners={{tabPress: e => {
                    e.preventDefault();
                    navigation.navigate('PhotoNav');
                }}}
            />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Notifications" component={Notifications} />
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });