import React from 'react';
import { FlatList, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

export default function Detail({ route }){
    const FULL_POST = gql`
        query seeFullPost($postId: String!) {
            seeFullPost(postId: $postId){
                post {
                    id
                    caption
                    user {
                        id
                        avatar
                        name
                        email
                    }
                    files {
                        id
                        url
                    }
                    likeCount
                    isLiked
                    comments {
                        id
                        text
                        
                    }
                }
            }
        }
    `;
    const { loading, error, data } = useQuery(FULL_POST, {
        variables: {
            postId: route.params.id
        }
    });
    return(
        <ScrollView>
            {loading ? <Loader /> : 
             data && data.seeFullPost && <Post {...data.seeFullPost.post}/>}
        </ScrollView>
    );
};