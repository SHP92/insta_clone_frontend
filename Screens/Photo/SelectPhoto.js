import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Loader from '../../Components/Loader';
import { createStackNavigator } from '@react-navigation/stack';
import UploadPhoto from './UploadPhoto';
import theme from '../../theme';

const Stack = createStackNavigator();

export default function SelectPhoto(){
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [allPhotos, setAllPhotos] = useState();
    const [selected, setSelected] = useState('');
    const navigation = useNavigation();

    const getPhotos = async() => {
        try {
            const photos = await MediaLibrary.getAssetsAsync();
            setAllPhotos(photos.assets);
            setSelected(allPhotos[0]);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const askPermission = async() => {
        try{
            const permissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (permissions.status === 'granted') {
                setHasPermission(true);
                getPhotos();
            }
        } catch (e) {
            console.log(e);
            setHasPermission(false);
        }
    };
    const uploadPhoto = () => {
        navigation.navigate('selectUploadPhoto',  { photo: selected });
    }

    useEffect(()=>{
        askPermission();
    }, []);

    const selectPhotoPage = () => (
        <View style={styles.container}>
            {loading ? <Loader /> : hasPermission ? 
            <ScrollView>
                <View>
                    <ImageBackground source={{uri: selected.uri ?? allPhotos[0].uri}} style={styles.wholeImage}>
                        <TouchableOpacity style={styles.buttonContainer} onPressOut={uploadPhoto}>
                            <View style={styles.button}>
                                <Feather name='upload' color='white' size={20}/>
                                <Text style={styles.buttonText}>upload</Text>
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <FlatList
                    data={allPhotos}
                    renderItem={({item})=>(
                        <TouchableOpacity onPressOut={()=>setSelected(item)}>
                            <Image 
                                source={{uri: item.uri}} 
                                style={{...styles.image, opacity: item.id === selected.id ? 0.4 : 1.0 }}
                            />
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                /> 
            </ScrollView>
            : null}
        </View>
    );

    return(
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='selectPhotoPage' component={selectPhotoPage}/>
            <Stack.Screen name='selectUploadPhoto' component={UploadPhoto}/>
        </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('screen').width /3,
        height: Dimensions.get('screen').height /4,
    },
    wholeImage: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height /2,
        resizeMode: 'cover',
    },
    buttonContainer: {
        alignItems: 'center',
        margin: 10,
    },
    button: {
        padding: 10,
        backgroundColor: theme.blueColor,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
    },
  });