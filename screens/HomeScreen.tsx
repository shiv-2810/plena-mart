import { EvilIcons, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import Product from '../components/Product';
import ScreenContainer from '../components/ScreenContainer';
import { GRAY_SCALE_BLACK, WHITE } from '../constants/constant';


const HomeScreen = () => {

  const [products, setProducts] = useState([])
  const [productsCopy, setProductsCopy] = useState([])
  const [productName, setProductName] = useState('')

  useEffect(() => {
    (async () => {
      const data = await fetch('https://dummyjson.com/products')
      const finalProducts = await data.json()
      setProducts(finalProducts.products)
      setProductsCopy(finalProducts.products)
    })()
  }, [])

  useEffect(() => {
    const data = productsCopy.filter((product: any) => (product.title).toLowerCase().includes(productName.toLowerCase()))
    setProducts(data)
  }, [productName])
  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: 'white' }}>
      <ScreenContainer tintColor={'white'} nameShown={true} style={{ backgroundColor: '#2A4BA0' }}>
        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.searchContainer}>
            <Ionicons name="ios-search-outline" size={24} color="white" />
            <TextInput onChangeText={(value) => setProductName(value)} style={styles.textInput} placeholder='Search Products or store' placeholderTextColor={'#8891A5'} />
          </View>
          <View style={[styles.rowContainer, { paddingBottom: 10 }]}>
            <View>
              <Text style={styles.titleTxt}>DELIVERY TO</Text>
              <View style={[styles.rowContainer, { justifyContent: 'flex-start' }]}>
                <Text style={{ color: WHITE }}>Green Way 3000, Sylhet</Text>
                <EvilIcons name="chevron-down" size={24} color={WHITE} />
              </View>
            </View>
            <View>
              <Text style={styles.titleTxt}>WITHIN</Text>
              <View style={[styles.rowContainer, { justifyContent: 'flex-start' }]}>
                <Text style={{ color: WHITE }}>1 Hour</Text>
                <EvilIcons name="chevron-down" size={24} color={WHITE} />
              </View>
            </View>
          </View>
        </View>
      </ScreenContainer>
      <FlatList
        data={products}
        style={{ width: '100%' }}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item, index }) => (
          <Product product={item} />
        )}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  searchContainer: {
    padding: 18,
    backgroundColor: '#153075',
    borderRadius: 28,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25
  },

  textInput: {
    paddingLeft: 10,
    fontSize: 18,
    color: 'white'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    color: GRAY_SCALE_BLACK,
    fontSize: 11
  },


})