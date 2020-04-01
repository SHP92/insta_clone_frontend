import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchBar from '../Components/SearchBar';

export default function Search(){
    const Stack = createStackNavigator();
    const [value, setValue] = useState('');
    const [result, setResult] = useState(value);

    const handleChange = (newValue) => (
        setValue(newValue)
    );
    const handleSubmit = () => (
        setResult(value)
    );

    const Result = () => {
        return(
            <Text>{`basic ${result}`}</Text>
        );
    };
    const SearchMain = () => {
        return(
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name='Result' component={Result}/>
            </Stack.Navigator>
        )
    };
    
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='SearchMain' component={SearchMain} 
                options={{
                    headerTitle: () => SearchBar(value, handleChange, handleSubmit),
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });