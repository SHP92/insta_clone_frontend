import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import Message from '../Screens/Messages/Message';
import Messages from '../Screens/Messages/Messages';


export default function MessageNav() {
  const Stack = createStackNavigator();
  return (
    <View>
      <Text> MessageNav </Text>
    </View>
    // <Stack.Navigator>
    //   <Stack.Screen name="Message" component={Message}/>
    //   <Stack.Screen name="Messages" component={Messages}/>
    // </Stack.Navigator>
  );
}