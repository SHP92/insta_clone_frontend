import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import theme from '../theme';
import Swiper from 'react-native-swiper';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: String!){
        toggleLike(postId: $postId)
    }
`;

export default function Post(data){
    // console.log(data)
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(data.likeCount);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {
            postId: data.id
        }
    });
    const handleLike = async() => {
        setLiked(!liked);
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        try {
            await toggleLikeMutation();
        } catch (e) {
            console.log(e);
        }
    };

    return(
        <View style={styles.postContainer} key={data.id}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.user}>
                    <Image source={{uri: data.user.avatar}} style={styles.avatar}/>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{data.user.name}</Text>
                        <Text style={styles.userEmail}>{data.user.email}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='ios-more' size={25}/>
                </TouchableOpacity>
            </View>

            <Swiper style={styles.swiper} activeDotColor={'white'}>
                {data.files.map(file => (
                    <Image source={{uri: file.url}} style={styles.image}/>
                ))}
            </Swiper>

            <View style={styles.bottomButton}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.icon} onPressOut={handleLike}>
                        <Ionicons 
                            name={liked ? 'ios-heart' : 'ios-heart-empty'}
                            color={liked ? 'red' : 'black'}
                            size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <SimpleLineIcons name='bubbles' size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <SimpleLineIcons name='action-redo' size={25}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.desc}>{likeCount} likes</Text>
            </View>

            <View style={styles.caption}>
                <TouchableOpacity>
                    <Text style={styles.userName}>{data.user.name}</Text>
                </TouchableOpacity>
                <Text>{data.caption}</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.count}>see all {data.comments.length} comments</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:10,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
        resizeMode: 'contain',
    },
    userInfo: {
        paddingLeft: 5,
    },
    userName: {
        fontWeight: 'bold',
        paddingRight: 5,
    },
    userEmail: {
        fontStyle: 'italic',
        color: theme.darkGreyColor,
    },
    swiper: {
        height: Dimensions.get('screen').height*0.62
    },
    image: {
        resizeMode: 'cover',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height*0.62,
    },
    bottomButton: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        paddingRight: 10,
    },
    count: {
        paddingHorizontal: 10,
        fontStyle: 'italic',
        color: theme.darkGreyColor,
        borderBottomColor: theme.darkGreyColor,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    caption: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingBottom: 5,
    },
});