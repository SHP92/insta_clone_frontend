import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchBar from '../Components/SearchBar';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import SquarePhotos from '../Components/SquarePhotos';
import Detail from './Detail';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Search(){
    const navigation = useNavigation();
    const Stack = createStackNavigator();
    const [value, setValue] = useState(AsyncStorage.getItem('value'));
    const [result, setResult] = useState(value);
    const [refresh, setRefresh] = useState(false);
    const handleChange = (newValue) => (
        setValue(newValue)
    );
    const handleSubmit = async () => (
        setResult(value),
        await AsyncStorage.setItem('value', value)
    );
    
    const SEARCH_POST = gql`
        query searchPost($term: String!){
            searchPost(term: $term){
                id
                caption
                likeCount
                files{
                    url
                }
            }
        }
    `;
    const Result = () => {
        const {loading, error, data, refetch} = useQuery(SEARCH_POST, {
            variables: {
                term: result
            },
            skip: result === '',
            fetchPolicy: 'network-only',
        });
        console.log(data);
        
        const handleRefresh = async () => {
            try{
                setRefresh(true);
                await refetch({ variables: { term: result }});
            } catch (e) {
                console.log(`refetch error: ${e}`);
            } finally {
                setRefresh(false);
            }
        };

        if (loading) return <Loader />
        if (data && data.searchPost && data.searchPost[0].files) {
            return(
                <FlatList 
                    // refreshing={refresh}
                    // onRefresh={handleRefresh}
                    style={styles.FlatList}
                    data={data.searchPost}
                    numColumns={3}
                    renderItem={({item})=>(
                        <View style={{flexDirection:'row-reverse'}}>
                            <SquarePhotos key={item.id} {...item}/>
                        </View>
                    )}  
                />
            );
        } else {
            return <View><Text>searching...</Text></View>
        }
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
            <Stack.Screen 
                name='Detail' component={Detail}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => <Ionicons name='logo-instagram' size={35}/>,
                    headerBackTitleVisible: true,
                }}    
            />
        </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    FlatList: {
        backgroundColor: 'white',
    },
  });