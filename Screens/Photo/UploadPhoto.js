import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Alert } from 'react-native';
import axios from 'axios'
import { gql } from 'apollo-boost';
import theme from '../../theme';
import { Feather } from '@expo/vector-icons';
import { useMutation } from 'react-apollo-hooks';
import Loader from '../../Components/Loader';
import Post from '../../Components/Post';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import TabNav from '../../Navigation/TabNav';
import { FEED_QUERY } from '../Home';

export default function UploadPhoto({ route }){
    const navigaton = useNavigation();
    const photo = route.params.photo;
    const [input, setInput] = useState('');
    const UPLOAD_MUTATION = gql`mutation uploadPost($caption: String!, $files: [String]){
        uploadPost(caption: $caption, files: $files){
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
                user {
                    id
                    name
                    avatar
                    email
                }
            }
        }
    }`;
    const [uploadMutation] = useMutation(UPLOAD_MUTATION, {
        refetchQueries: [{ query: FEED_QUERY }]
    });

    const upload = async() => {
        if (input === '') {
            Alert.alert('please fill the input');
        }

        const formData = new FormData();
        //formData.append(name, value) : name은 back-end multer에서 지정했던 것과 동일하게
        formData.append('file', {
            name: photo.filename,
            type : photo.filename.split('.')[1].toLowerCase(),
            uri: photo.uri,
        });

        try {
            const uploadFile = await axios.post('http://192.168.0.9:4000/api/uploads', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            const { data } = await uploadMutation({
                variables: {
                    caption: input,
                    files: [uploadFile.data.location]
                }
            });
            if (data.uploadPost){
                // navigaton.navigate('TabNav');
                Alert.alert('upload success');
            }
        } catch (e) {
            console.log(e);
            Alert.alert('cannot upload', 'please try later');
        } finally {
        }
    };

    return(
        <View style={styles.container}>
            <Image source={{uri: photo.uri}} style={styles.image}/>
            <View style={styles.subContainer}>
                <TextInput 
                    placeholder='caption' style={styles.input} value={input} 
                    onChangeText={(value)=>setInput(value)}
                />
                <TouchableOpacity onPressOut={upload}>
                    <View style={styles.button}>
                        <Feather name='upload' color='white' size={20}/>
                        <Text style={styles.buttonText}>upload</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    image: {
        width: Dimensions.get('screen').width /3,
        height: Dimensions.get('screen').height /5,
    },
    subContainer: {
        justifyContent: 'center',
        width: 200,
    },
    button: {
        padding: 10,
        backgroundColor: theme.blueColor,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    input: {
        textAlign: 'center',
        borderBottomColor: theme.lightGreyColor,
        borderBottomWidth: 1,
        margin: 10,
        paddingBottom: 5,
    },
  });