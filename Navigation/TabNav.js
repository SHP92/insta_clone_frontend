import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Search from '../Screens/Search';
import Notifications from '../Screens/Notifications';
import MessageLink from '../Components/MessageLink';


export default function TabNav({ navigation }){
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    const HomeStack = () => (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerRight: () => <MessageLink />}}>
            <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
    );
    const ProfileStack = () => (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
            <Stack.Screen name='Profile' component={Profile}/>
        </Stack.Navigator>
    );
    const SearchStack = () => (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
            <Stack.Screen name='Search' component={Search}/>
        </Stack.Navigator>
    );
    const NotificationsStack = () => (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
            <Stack.Screen name='Notifications' component={Notifications}/>
        </Stack.Navigator>
    );

    return(
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
                {/* add blank(fake) screen using View */}
            <Tab.Screen 
                name="Add" 
                component={View} 
                listeners={{tabPress: e => {
                    e.preventDefault();
                    navigation.navigate('PhotoNav');
                }}}
            />
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen name="Notifications" component={NotificationsStack} />
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