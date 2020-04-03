import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Loader from '../../Components/Loader';
import { MaterialIcons } from '@expo/vector-icons';

export default function TakePhoto(){
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

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

    useEffect(()=>{
        askPermission();
    }, []);

    return(
        loading ? <Loader/> : hasPermission ? 
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type}>
                <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={{alignSelf: 'flex-end', alignItems: 'center'}}
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
  });