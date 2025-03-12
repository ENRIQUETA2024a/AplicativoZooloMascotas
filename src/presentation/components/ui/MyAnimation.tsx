import {useRef,useCallback } from 'react';
import {Animated, Easing} from 'react-native';

export const useAnimation = () => {
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    const animatedTop = useRef(new Animated.Value(0)).current;

    const fadeIn = useCallback(({ duration = 300, toValue = 1, callback }: {
        duration?: number; toValue?: number; callback?: () => void;
    } = {}) => {
        Animated.timing(animatedOpacity, {
            toValue,
            duration,
            useNativeDriver: true,
        }).start(() => callback?.());
    }, []);

    const fadeOut = useCallback(({ duration = 300, toValue = 0, callback }: {
        duration?: number; toValue?: number; callback?: () => void;
    } = {}) => {
        Animated.timing(animatedOpacity, {
            toValue,
            duration,
            useNativeDriver: true,
        }).start(() => callback?.());
    }, []);

    const startMovingTopPosition = useCallback(({
                                                    initialPosition = 0, toValue = 0, duration = 300, easing = Easing.linear, callback
                                                }: {
        initialPosition?: number; toValue?: number; duration?: number; easing?: (value: number) => number; callback?: () => void;
    } = {}) => {
        animatedTop.setValue(initialPosition);
        Animated.timing(animatedTop, {
            toValue,
            duration,
            useNativeDriver: true,
            easing,
        }).start(() => callback?.());
    }, []);


    return {
        // Properties
        animatedOpacity,
        animatedTop,

        // Methods
        fadeIn,
        fadeOut,
        startMovingTopPosition,
    };
};