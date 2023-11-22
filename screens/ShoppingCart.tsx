import { View, Text, SafeAreaView, StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'
import { GRAY_SCALE_BLACK, LIGHTBLUE, LIGHTGRAY, WHITE } from '../constants/constant'
import BackButton from '../components/BackButton'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'

const ShoppingCart = () => {
    const cart = useSelector((state: any) => state.cart)
    const price = cart.reduce((acc: any, item: any) => acc += item.product.price * item.quantity, 0)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>

            <View style={styles.headerContainer}>
                <BackButton />
                <Text style={{ fontSize: 18 }}>Shopping Cart ({cart.length})</Text>
            </View>
            <FlatList
                data={cart}
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
                ListEmptyComponent={<Text>NO ITEMS IN CART</Text>}
                renderItem={({ item, index }) => <CartItem key={index} item={item} />}
            />
            <View style={styles.checkoutContainer}>
                <View style={styles.textContainer}>
                    <Text style={{ color: GRAY_SCALE_BLACK }}>Subtotal</Text>
                    <Text>{`$${price}`}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={{ color: GRAY_SCALE_BLACK }}>Delivery</Text>
                    <Text>{`$${2}`}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={{ color: GRAY_SCALE_BLACK }}>Total</Text>
                    <Text>{`$${price + 2}`}</Text>
                </View>
                <Pressable style={styles.checkoutBtn}>
                    <Text style={{ color: WHITE }}>Proceed To Checkout</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default ShoppingCart

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkoutContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: LIGHTGRAY,
        borderRadius: 15,
        padding: 10,
        paddingHorizontal: 15
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 10
    },
    checkoutBtn: {
        width: '97%',
        alignSelf: 'center',
        backgroundColor: LIGHTBLUE,
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20
    }
})