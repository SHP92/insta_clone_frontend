import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Loader from '../Components/Loader';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

const FEED_QUERY = gql`
    {
        seeFeed {
            id
            loaction
            caption
            user {
                id
                avatar
                name
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
                user {
                    id
                    name
                }
            }
        }
    }
`;

export default function Home(){
    const { loading, error, data } = useQuery(FEED_QUERY);
    console.log(loading, data);

    return(
        loading ? <Loader /> :
        <View style={styles.container}>
            <Text> Home </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });