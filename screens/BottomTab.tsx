import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import CategoryScreen from "./CategoryScreen";
import MoreScreen from "./MoreScreen";
import FavouriteScreen from "./FavouriteScreen";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", padding: 15 }}
            key={index}
          >
            {label === "Favourite" && (
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/Heart.png")}
              />
            )}
            {label === "Home" && (
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/home.png")}
              />
            )}
            {label === "Categories" && (
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/Category.png")}
              />
            )}
            {label === "More" && (
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/more_vertical.png")}
              />
            )}

            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Categories"
        options={{ headerShown: false }}
        component={CategoryScreen}
      />
      <Tab.Screen
        name="Favourite"
        options={{ headerShown: false }}
        component={FavouriteScreen}
      />
      <Tab.Screen
        name="More"
        options={{ headerShown: false }}
        component={MoreScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
