import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { LIGHTGRAY } from "../constants/constant";
import { View } from "react-native";

export const PaginationItem: React.FC<{
    index: number
    backgroundColor: string
    length: number
    animValue: Animated.SharedValue<number>
    isRotate?: boolean
}> = (props) => {
    const { animValue, index, length, backgroundColor, isRotate } = props;
    const width = 20;

    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP,
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
    return (
        <View
            style={{
                backgroundColor: LIGHTGRAY,
                width,
                height: width / 3,
                borderRadius: 50,
                overflow: "hidden",
                marginHorizontal: 5,
                transform: [
                    {
                        rotateZ: isRotate ? "90deg" : "0deg",
                    },
                ],
            }}
        >
            <Animated.View
                style={[
                    {
                        borderRadius: 50,
                        backgroundColor,
                        flex: 1,
                    },
                    animStyle,
                ]}
            />
        </View>
    );
};