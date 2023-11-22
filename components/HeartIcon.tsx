// HeartIcon.js

import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';// Import your action creators
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using react-native-vector-icons
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { addToFavorites, removeFromFavorites } from '../features/favourites';

const HeartIcon = ({ item, parent }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: any) => state.favorites.favorites);
    const isFavorited = favorites.some((favorite: any) => favorite.id === item.id);
    const scale = useSharedValue(1);


    useEffect(() => {
        scale.value = withSpring((isFavorited ) ?  1.3 : 1, { damping: 2 });
    }, [isFavorited]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    const handlePress = () => {
        if (isFavorited) {
            dispatch(removeFromFavorites(item));
        } else {
            dispatch(addToFavorites(item));
        }
    };

    return (
        <TouchableOpacity style={!parent &&[{
            position: 'absolute',
            left: 12,
            top: 12
        }]} onPress={handlePress}>
            <Animated.View style={animatedStyle}>
                {!isFavorited ? <EvilIcons name="heart" size={27} color={'grey'} /> : <AntDesign name="heart" size={20} color="red" />}

            </Animated.View>
        </TouchableOpacity>
    );
};

export default HeartIcon;
