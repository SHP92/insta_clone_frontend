import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Loader from '../../Components/Loader';

export default function SelectPhoto(){
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [allPhotos, setAllPhotos] = useState();
    const [selected, setSelected] = useState('');

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

    useEffect(()=>{
        askPermission();
    }, []);

    return(
        <View style={styles.container}>
            {loading ? <Loader /> : hasPermission ? 
            <ScrollView>
                <Image source={{uri: selected.uri ?? allPhotos[0].uri}} style={styles.wholeImage}/>
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
  });