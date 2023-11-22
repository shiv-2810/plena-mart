import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { LIGHTGRAY, SCREEN_WIDTH } from '../constants/constant';
import { Octicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/products';
import HeartIcon from './HeartIcon';



const Product = ({product}) => {
  const navigation :any = useNavigation()
  const dispatch = useDispatch()
  const item = useSelector((state:any) => state.cart)
  
  return (
    <Pressable onPress={()=>navigation.navigate('productDetailScreen',{product})} style={styles.productContainer}>
    <View style={{padding:10,width:'100%',alignItems:'center',marginTop:20}}>
    <Image source={{uri:product.thumbnail}} style={{width:100,height:100,borderRadius:10}} />
    </View>
    <HeartIcon parent={false} item={product} />
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <View>
        <Text>{`$${product.price}`}</Text>
        <Text numberOfLines={1} style={{color:'#616A7D', flex:1, width:SCREEN_WIDTH/4}}>{product.title}</Text>
      </View>
      <AntDesign onPress={()=>dispatch(addToCart(product.id,product))} name="pluscircle" size={25} color="#2A4BA0"  />
    </View>
    </Pressable>
  )
}

export default Product

const styles = StyleSheet.create({
    productContainer:{
        padding:15,
        backgroundColor:LIGHTGRAY,
        width:SCREEN_WIDTH/2.1,
        alignSelf:'center',
        margin:5,
        borderRadius:10
    },
    heartOutline:{
      position:'absolute',
      left:8,
      top:8
    },
})