import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Search from '../Screens/Search';
import Notifications from '../Screens/Notifications';
import MessageLink from '../Components/MessageLink';
import theme from '../theme';
import SearchBar from '../Components/SearchBar';
import Detail from '../Screens/Detail';
import UserDetail from '../Screens/UserDetail';


export default function TabNav(){
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const navigation = useNavigation();
    const tabIcon = (icon, color) => (
        <Ionicons name={icon} size={25} color={color}/>
    );

    const HomeStack = () => (
        <Stack.Navigator 
            screenOptions={{ 
                headerTitleAlign: 'center', 
                headerRight: () => (
                    <TouchableOpacity onPressOut={()=>navigation.navigate('MessageLink')} style={{paddingRight:20}}>
                        {tabIcon('md-paper-plane')}
                    </TouchableOpacity>
                )
            }}
        >
            <Stack.Screen 
                name='Home' component={Home}
                options={{
                    headerTitle:()=><Image source={require('../assets/logo.png')} resizeMode='contain' style={{height:35}}/>,
                    
                }}
            />
        </Stack.Navigator>
    );
    const ProfileStack = ({route}) => (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen 
                name='UserDetail' component={UserDetail} 
                options={{
                    headerTitle:()=><Text style={{fontWeight:'bold', fontSize:20}}>{route.params.params.name}</Text>
                }}
            />
        </Stack.Navigator>
    );
    const SearchStack = () => (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
    );
    const NotificationsStack = () => (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center'}}>
            <Stack.Screen name='Notifications' component={Notifications}/>
        </Stack.Navigator>
    );

    return(
        <Tab.Navigator 
            initialRouteName="Home" 
            tabBarOptions={{ 
                showLabel:false,
                style: {},
            }}
        >
            <Tab.Screen 
                name="HomeStack" component={HomeStack} 
                options={{ tabBarIcon: ({focused})=>tabIcon('ios-home', focused ? 'black' : theme.darkGreyColor)}} />
            <Tab.Screen 
                name="ProfileStack" component={ProfileStack} 
                options={{ tabBarIcon: ({focused})=>tabIcon('md-person', focused ? 'black' : theme.darkGreyColor)}}/>
                {/* add blank(fake) screen using View */}
            <Tab.Screen 
                name="Add" 
                component={View}
                options={{ tabBarIcon: ({focused})=>tabIcon('ios-add-circle-outline', focused ? 'black' : theme.darkGreyColor)}}
                listeners={{tabPress: e => {
                    e.preventDefault();
                    navigation.navigate('PhotoNav');
                }}}
            />
            <Tab.Screen 
                name="SearchStack" component={SearchStack} 
                options={{tabBarIcon: ({focused})=>tabIcon('ios-search', focused ? 'black' : theme.darkGreyColor)}}
            />
            <Tab.Screen 
                name="NotificationsStack" component={NotificationsStack} 
                options={{ tabBarIcon: ({focused})=>tabIcon(focused ? 'md-heart' : 'md-heart-empty', focused ? 'black' : theme.darkGreyColor)}}/>
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