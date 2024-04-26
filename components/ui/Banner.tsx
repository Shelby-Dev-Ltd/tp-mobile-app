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

    // Function to handle manual slide change
    change = (event: { nativeEvent: { contentOffset: { x: number; }; layoutMeasurement: { width: number; }; }; }) => {
        const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide });
        }
    };

    // Function to handle auto-scroll
    autoScroll = () => {
        const { images } = this.props;
        const { active } = this.state;
        const nextSlide = (active + 1) % images.length;
        this.setState({ active: nextSlide });
        const screenWidth = Dimensions.get('window').width;
        this.scrollView.scrollTo({ x: nextSlide * screenWidth, animated: true });
    }
    scrollView: any;
    interval: NodeJS.Timeout;

    // Start auto-scroll when component mounts
    componentDidMount() {
        this.interval = setInterval(this.autoScroll, 3000); // Adjust interval duration as needed
    }

    // Stop auto-scroll when component unmounts
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <View style={bannerStyles.container}>
                <ScrollView 
                    ref={(ref) => { this.scrollView = ref; }}
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
