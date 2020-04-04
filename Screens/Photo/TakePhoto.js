import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import Loader from '../../Components/Loader';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';

export default function TakePhoto(){
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [canTakePhoto, setCanTakePhoto] = useState(true);
    const cameraRef = useRef();

    const askPermission = async() => {
        try{
            const permissions = await Permissions.askAsync(Permissions.CAMERA);
            if (permissions.status === 'granted') {
                setHasPermission(true);
            }
        } catch (e) {
            console.log(e);
            setHasPermission(false);
        } finally {
            setLoading(false);
        }
    };
    const takePhotos = async() => {
        if (!canTakePhoto) return

        try {
            const photo = await cameraRef.current.takePictureAsync({});
            await MediaLibrary.createAssetAsync(photo.uri);
            setCanTakePhoto(false);
        } catch (e) {
            console.log(e);
            setCanTakePhoto(true);
        }
    };

    useEffect(()=>{
        askPermission();
    }, []);

    return(
        loading ? <Loader/> : hasPermission ? 
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
                <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={{alignSelf: 'flex-start', alignItems: 'center'}}
                        onPress={() => {
                            setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <MaterialIcons name='switch-camera' size={30} style={{padding:20, color:'white'}}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPressOut={takePhotos} disabled={!canTakePhoto}>
                    <MaterialCommunityIcons name='circle-slice-8' color='white' size={75}/>
                </TouchableOpacity>
            </Camera>
        </View> : null
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        padding: 10,
    },
  });