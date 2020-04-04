import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import Loader from '../../Components/Loader';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import UploadPhoto from './UploadPhoto';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function TakePhoto(){
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef();
    const navigation = useNavigation();

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
        try {
            const photo = await cameraRef.current.takePictureAsync({});
            navigation.navigate('takeUploadPhoto', { photo: photo });
            await MediaLibrary.createAssetAsync(photo.uri);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        askPermission();
    }, []);

    const takePhotoPage = () => (
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
                <TouchableOpacity style={styles.buttonContainer} onPressOut={takePhotos}>
                    <MaterialCommunityIcons name='circle-slice-8' color='white' size={75}/>
                </TouchableOpacity>
            </Camera>
        </View> : null
    );

    return(
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='takePhotoPage' component={takePhotoPage}/>
            <Stack.Screen name='takeUploadPhoto' component={UploadPhoto}/>
        </Stack.Navigator>
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