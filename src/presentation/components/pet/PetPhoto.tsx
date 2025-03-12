import {useEffect, useRef, useState} from "react";
import {
    ActivityIndicator,
    Animated,
    ImageStyle,
    StyleProp,
    View,
} from "react-native";
import {useAnimation} from "../ui/MyAnimation";

interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>
}

export const PetPhoto = ({uri, style}: Props) => {
    const {animatedOpacity, fadeIn} = useAnimation();
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(true);

    const isDisposed = useRef(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const onLoadEnd = () => {
        if (!isMounted) return;
        fadeIn({});
        setIsLoading(false);
    };

    return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
            {isLoading && (
                <ActivityIndicator
                    style={{position: "absolute"}}
                    color="grey"
                    size={30}
                />
            )}

            <Animated.Image
                source={{uri}} // 👈 No necesitamos verificar si es null porque el mapper lo maneja
                onLoadEnd={onLoadEnd}
                style={[style, {opacity: animatedOpacity, resizeMode: "contain"}]}
            />
        </View>
    );
}