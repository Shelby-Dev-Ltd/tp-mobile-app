import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from "react-native";
import React from "react";
import { bannerStyles } from "../../styles/banner";

interface BannerProps {
    images: string[];
}

export default class Banner extends React.Component<BannerProps> {

    state = {
        active: 0
    }

    change = (event: { nativeEvent: { contentOffset: { x: number; }; layoutMeasurement: { width: number; }; }; }) => {
        const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide });
        }
    };
    

    render() {
        return(
        <View style={bannerStyles.container}>
            <ScrollView 
                pagingEnabled 
                horizontal
                onScroll={this.change} 
                showsHorizontalScrollIndicator={false}
                style={bannerStyles.scroll}>
            {
                this.props.images.map((image, index) => (
                    <Image
                    key={index}
                    source={{uri: image}}
                    style={bannerStyles.image}
                    /> 
                    ))
                }
            </ScrollView>
            <View style={bannerStyles.pagination}>
                {
                    this.props.images.map((i, k) => (
                        <Text key={k} style={k == this.state.active ? bannerStyles.pagingActiveText : bannerStyles.pagingText}>
                        ⬤
                        </Text>
                    ))
                }
            </View>
        </View>
    );
}
}

