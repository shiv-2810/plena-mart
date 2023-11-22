import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LIGHTGRAY } from '../constants/constant';

const BackButton = () => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={()=>navigation.goBack()} style={styles.container}>
            <MaterialIcons name="chevron-left" size={24} color="black" />
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        backgroundColor:LIGHTGRAY,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:15,
    }
})