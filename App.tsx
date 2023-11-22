
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './screens/BottomTab';
import ProductDetailScreen from './screens/ProductDetailScreen';
const Stack = createNativeStackNavigator();
import { store } from "./store";
import { Provider } from 'react-redux';
import ShoppingCart from './screens/ShoppingCart';



function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <StatusBar barStyle='default'  />
      <Stack.Navigator>
        <Stack.Screen name="launchScreen" options={{headerShown:false}} component={BottomTab} />
        <Stack.Screen name="productDetailScreen" options={{headerShown:false}} component={ProductDetailScreen} />
        <Stack.Screen name="shoppingCartScreen" options={{headerShown:false}} component={ShoppingCart} />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
