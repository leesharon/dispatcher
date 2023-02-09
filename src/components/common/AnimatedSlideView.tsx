import { AppText } from 'components/common/AppText'
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"

interface AnimatedSlideViewProps {
    styleProps: {}
    children: JSX.Element
}

const AnimatedSlideView = ({ styleProps, children }: AnimatedSlideViewProps): JSX.Element => {

    const slideAnimation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(slideAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
        return () => {
            Animated.timing(slideAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start()
        }
    }, [slideAnimation])

    return (
        <Animated.View
            style={[styles.container, styleProps, {
                opacity: slideAnimation,
                transform: [{
                    translateX: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [250, 0]
                    }),
                }],
            }]}>
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        transform: [{
            translateX: 250,
        }],
    }
})
export { AnimatedSlideView }