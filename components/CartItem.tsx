import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LIGHTGRAY } from '../constants/constant';
import { updateQuantity } from '../features/products';

const CartItem = ({ item }) => {
    const { product: { title, thumbnail, price }, quantity = 0, productId } = item
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: thumbnail }} style={styles.image} />
                <View>
                    <Text>{title}</Text>
                    <Text>{`$${price}`}</Text>
                </View>
            </View>
            <View style={styles.addRemoveView}>
                <Pressable onPress={() => dispatch(updateQuantity(productId, -1))} style={styles.circle}>
                    <Ionicons name="remove-outline" size={24} color="black" />
                </Pressable>
                <Text style={{ marginHorizontal: 12 }}>{quantity}</Text>
                <Pressable onPress={() => dispatch(updateQuantity(productId, 1))} style={styles.circle}>
                    <Ionicons name="add-outline" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#EBEBFB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 44,
        height: 44,
        objectFit: 'cover',
        borderRadius: 5,
        marginRight: 10
    },
    circle: {
        width: 40,
        height: 40,
        backgroundColor: LIGHTGRAY,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addRemoveView: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})