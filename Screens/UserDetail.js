import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import User from '../Components/User';

export default function UserDetail({ route }){
    const USER_DETAIL = gql`query seeUserProfile($id: String!){
        seeUserProfile(id: $id){
            user {
                id
                avatar
                name
                email
            }
            posts{
                id
                user {
                    id
                    avatar
                    name
                    email
                }
                caption
                files {
                    id
                    url
                }
                likeCount
                isLiked
                comments {
                    id
                    text
                    user {
                        id
                        name
                        avatar
                        email
                    }
                }
            }
            followers{
                id
                avatar
                name
                email
            }
            followings{
                id
                avatar
                name
                email
            }
        }
    }`;
    const {loading, data, error} = useQuery(USER_DETAIL, {
        variables: {
            id: route.params.id
        }
    })
    console.log(data)
    return(
        loading ? <Loader /> : 
        data && data.seeUserProfile && <User {...data.seeUserProfile}/>
    );
};

const styles = StyleSheet.create({

});