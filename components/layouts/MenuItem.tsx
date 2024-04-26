import { Ionicons } from "@expo/vector-icons"
import React, { useEffect } from "react"
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { menuItemProps } from "../../types/menuitemprops"
import { useSharedValue, withTiming } from "react-native-reanimated";
import { AnimatedView } from "react-native-reanimated/lib/typescript/reanimated2/component/View";

const windowWidth = Dimensions.get('window').width;

export const MenuItem = ({ page, doNavigate, isOpen }: menuItemProps) => {
    const [containerSize, setContainerSize] = React.useState<number>();
    const widthAnimation = useSharedValue(0);

    useEffect(() => {
        widthAnimation.value = windowWidth * 0.5; // Set the width to half of the window width
        // Start the animation
        widthAnimation.value = withTiming(100, { duration: 3000 });
    }, []);

    const styles = StyleSheet.create({
        onOpenStyle: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: windowWidth / 5, // TODO: FINISH ANIMATION
            zIndex: 100,
            backgroundColor: '#2F80ED',
            height: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            elevation: 2,
            shadowColor: '#2F80ED',
        }
    })

    const onOpenAnimation = {
        width: widthAnimation.value
    }

    return (
        <View style={{ position: 'relative' }}>
            <Animated.View style={onOpenAnimation}>
                <View style={isOpen ? styles.onOpenStyle : null} />
            </Animated.View>
            <TouchableOpacity
                style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 1,
                }}
                onPress={() => doNavigate(page.destination)}
                onLayout={layoutEvent =>
                    setContainerSize(layoutEvent.nativeEvent.layout.width)
                }
            >
                <Ionicons
                    name={page.ioniconstring as any}
                    size={(containerSize ? containerSize - 50 : 0) || 0}
                    color={isOpen ? "#2F80ED" : 'grey'}
                />
            </TouchableOpacity>
        </View>
    )
}
