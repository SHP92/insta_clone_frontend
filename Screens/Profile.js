import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import User from '../Components/User';

export default function Profile(){
    const MY_PROFILE = gql`{
        seeMyProfile{
            id
            avatar
            name
            email
        }
    }`;
    const {loading, data, error} = useQuery(MY_PROFILE);
    console.log(data.seeMyProfile);
    return(
        loading ? <Loader /> : 
        data && data.seeMyProfile && <User {...data.seeMyProfile}/>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });