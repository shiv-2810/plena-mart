import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import ScreenContainer from '../components/ScreenContainer'
import Carousel from 'react-native-reanimated-carousel'
import { GRAY_SCALE_BLACK, LIGHTBLUE, LIGHTGRAY, SCREEN_WIDTH, WHITE } from '../constants/constant'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { PaginationItem } from '../components/PaginationItem'
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/products'
import { AntDesign } from '@expo/vector-icons';


const ProductDetailScreen = ({ route }) => {
    const { product } = route?.params || {}
    const cartItems = useSelector((state: any) => state.cart)
    const progressValue = useSharedValue<number>(0);
    const colors = Array(product.images.length).fill("#F5D399")
    const navigation: any = useNavigation()
    const dispatch = useDispatch()
    const itemAlreadyInCart = cartItems.some((item:any)=>item.productId === product.id)

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScreenContainer nameShown={false} tintColor='black' style={{}}>

                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 50, fontWeight: '600' }}>{product.title}</Text>
                </View>
                <View style={{backgroundColor:LIGHTGRAY}}>
                    <View style={styles.favouriteBtn}>
                        <EvilIcons name="heart" size={26} color="black" />
                    </View>
                    <Carousel
                        loop
                        width={SCREEN_WIDTH}
                        height={SCREEN_WIDTH / 1.8}
                        data={[...product.images]}
                        pagingEnabled={true}
                        onProgressChange={(_, absoluteProgress) =>
                            (progressValue.value = absoluteProgress)
                        }
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    source={{ uri: item }}
                                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}

                                />
                            </View>
                        )}
                    />
                    {!!progressValue && (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: 100,
                                alignSelf: "center",
                                marginTop: 10,
                            }
                            }
                        >
                            {colors.map((color, index) => {
                                return (
                                    <PaginationItem
                                        backgroundColor={color}
                                        animValue={progressValue}
                                        index={index}
                                        key={index}
                                        isRotate={false}
                                        length={colors.length}
                                    />

                                );
                            })}
                        </View>)}

                </View>
            </ScreenContainer>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 30 }}>
                <Text style={styles.productPriceTxt}>{`$${product.price}`}<Text style={{ fontWeight: 'normal' }}>/kg</Text></Text>
                <View style={styles.discountContainer}>
                    <Text style={styles.discountText}>{`$${product.discountPercentage} OFF`}</Text>
                </View>
            </View>
            <View style={styles.btnBox}>
                <Pressable onPress={() =>{itemAlreadyInCart ? navigation.navigate('shoppingCartScreen'): dispatch(addToCart(product.id, product))}} style={styles.addToCartBtn}>
                    <Text style={{ fontSize: 15, color: LIGHTBLUE }}>{`${!itemAlreadyInCart ? `Add To Cart` : `Go To Cart`} `}</Text>
                    {itemAlreadyInCart ? <AntDesign name="arrowright" size={20} color={LIGHTBLUE} /> : null}
                </Pressable>
                <Pressable onPress={() => navigation.navigate('shoppingCartScreen')} style={[styles.addToCartBtn, styles.buyNowBtn]}>
                    <Text style={{ fontSize: 15, color: WHITE }}>Buy now</Text>
                </Pressable>
            </View>
            <View style={styles.detailsBox}>
                <Text style={styles.detailsTxt}>Details</Text>
                <Text style={styles.descriptionTxt}>{product.description}</Text>
            </View>
        </View>
    )
}

export default ProductDetailScreen


const styles = StyleSheet.create({
    productPriceTxt: {
        color: LIGHTBLUE,
        fontSize: 16,
        fontWeight: 'bold'
    },
    discountContainer: {
        backgroundColor: LIGHTBLUE,
        padding: 15,
        paddingVertical: 5,
        borderRadius: 15,
        marginLeft: 15
    },
    discountText: {
        color: WHITE
    },
    btnBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addToCartBtn: {
        borderWidth: 1,
        borderColor: LIGHTBLUE,
        padding: 20,
        borderRadius: 20,
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'center'
    },
    buyNowBtn: {
        backgroundColor: LIGHTBLUE,
        borderWidth: 0
    },
    detailsBox: {
        marginLeft: 20,
        marginTop: 30,
    },
    detailsTxt: {
        fontSize: 18,
        marginBottom: 5
    },
    descriptionTxt: {
        color: GRAY_SCALE_BLACK
    },
    favouriteBtn: {
        position: 'absolute',
        right: 20,
        top: 8,
        zIndex: 100,
        backgroundColor: WHITE,
        borderRadius: 10,
        padding: 10
    },
})
