import React from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function User(data) {
    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={{uri: data.user.avatar}} style={styles.image}/>
                <View style={styles.activities}>
                    <View style={styles.activity}>
                        <Text style={styles.count}>{data.posts.length}</Text>
                        <Text style={styles.label}>posts</Text>
                    </View>
                    <View style={styles.activity}>
                        <Text style={styles.count}>{data.followings.length}</Text>
                        <Text style={styles.label}>followings</Text>
                    </View>
                    <View style={styles.activity}>
                        <Text style={styles.count}>{data.followers.length}</Text>
                        <Text style={styles.label}>followers</Text>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.name}>{data.user.name}</Text>
                <Text>{data.user.email}</Text>
            </View>

            <NavigationContainer independent={true}>
                <Tab.Navigator tabBarOptions={{showLabel:false, showIcon:true, indicatorStyle:{backgroundColor:'white'}}}>
                    <Tab.Screen 
                        name='grid' component={gridPhoto} 
                        options={{ tabBarIcon:({focused, color})=>(
                            <Ionicons name='ios-grid' size={27} color={focused ? color : theme.darkGreyColor}/>
                        )}}
                    />
                    <Tab.Screen 
                        name='list' component={listPhoto}
                        options={{ tabBarIcon:({focused, color})=>(
                            <Ionicons name='ios-list' size={27} color={focused ? color : theme.darkGreyColor}/>
                        )}}    
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </ScrollView>
    )
};

const gridPhoto = () => {
    return(
        <View>
            <Text>gridPhoto</Text>
        </View>
    );
};

const listPhoto = () => {
    return (
        <View>
            <Text>listPhoto</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 20,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    activities: {
        flexDirection: 'row',
        paddingHorizontal: 30,
    },
    activity: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    count: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    label: {
        color: theme.darkGreyColor,
    },
    body: {
        padding: 5,
        paddingHorizontal: 25,
    },
    name: {
        fontWeight: 'bold',
    },
});