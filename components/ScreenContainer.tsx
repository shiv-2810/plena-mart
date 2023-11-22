import { View, Text, SafeAreaView, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { LIGHTGRAY, SCREEN_HEIGHT, WHITE, YELLOW } from '../constants/constant'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BackButton from './BackButton';

const ScreenContainer = ({ children, style, nameShown, tintColor }) => {
    const navigation:any = useNavigation()
    const cartItems = useSelector((state: any) => state.cart)
    return (
        <SafeAreaView style={{ ...style, paddingTop:35 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    {nameShown ? <Text style={styles.headerText}>
                        Hey, Rahul
                    </Text> :<BackButton />}
                    <Pressable onPress={()=>navigation.navigate('shoppingCartScreen')}>
                      <View style={styles.itemsCount}>  
                     <Text numberOfLines={1} adjustsFontSizeToFit style={styles.countTxt}>{cartItems.length}</Text>   
                     </View>
                    <Image style={[styles.image, { tintColor }]} source={require('../assets/bag.png')} />
                    </Pressable>
                </View>
            </View>
            {children}
        </SafeAreaView>
    )
}

export default ScreenContainer

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 0.9
    },
    image: {
        width: 22,
        height: 24,
    },
    itemsCount:{
        position:'absolute',
        backgroundColor:YELLOW,
        width:16,
        height:16,
        borderRadius:8,
        right:-5,
        top:-5,
        zIndex:10,
        alignItems:'center',
        justifyContent:'center'
    },
    countTxt:{
        color:WHITE,
        fontSize:12
    }
})