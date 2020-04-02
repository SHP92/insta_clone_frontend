import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SquarePhotos({files=[], id}) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity id={id} onPressOut={()=>navigation.navigate('Nav', {
            screen: 'SearchStack',
            params: {
                screen: "Search",
                params: {
                    screen: "Detail",
                    params: {
                        id
                    }
                }
            }
        })}>
            <Image source={{uri: files[0].url}} style={styles.image}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('screen').width/3,
        height: Dimensions.get('screen').height/4,
        resizeMode: 'cover',
    },
});