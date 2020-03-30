import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
    const [refresh, setRefresh] = useState(false);
    const { loading, error, data, refetch } = useQuery(FEED_QUERY);
    const handleRefresh = async() => {
        try {
            setRefresh(true);
            await refetch();
        } catch (e) {
            console.log(`refetch error: ${e}`);
        } finally {
            setRefresh(false);
        }
    }
    
    // console.log(loading, data.seeFeed);

    return(
        loading ? <Loader /> :
        <FlatList 
            style={styles.container}
            data={data.seeFeed}
            renderItem={({item})=><Text>{item.id}</Text>}
            refreshing={refresh}
            onRefresh={handleRefresh}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
    },
  });