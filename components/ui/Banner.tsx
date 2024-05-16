import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, Image, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { bannerStyles } from '../../styles/banner';

const Banner: React.FC<{ bannerImages: string[] }> = ({ bannerImages }) => {
    const [active, setActive] = useState<number>(0);
    const scrollView = useRef<ScrollView>(null);
    const interval = useRef<NodeJS.Timeout>();

    // Function to handle manual slide change
    const change = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    };

    // Function to handle auto-scroll
    const autoScroll = () => {
        const nextSlide = (active + 1) % bannerImages.length;
        setActive(nextSlide);
        const screenWidth = Dimensions.get('window').width;
        scrollView.current?.scrollTo({ x: nextSlide * screenWidth, animated: true });
    }

    // Start auto-scroll when component mounts
    useEffect(() => {
        interval.current = setInterval(autoScroll, 3000); // Adjust interval duration as needed
        return () => clearInterval(interval.current);
    }, []);

    return (
        <View style={bannerStyles.container}>
            <ScrollView
                ref={scrollView}
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                style={bannerStyles.scroll}>
                {
                    bannerImages.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={bannerStyles.image}
                        />
                    ))
                }
            </ScrollView>
            <View style={bannerStyles.pagination}>
                {
                    bannerImages.map((i, k) => (
                        <Text key={k} style={k == active ? bannerStyles.pagingActiveText : bannerStyles.pagingText}>
                            ⬤
                        </Text>
                    ))
                }
            </View>
        </View>
    );
};

export default Banner;
