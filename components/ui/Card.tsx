import { ReactNode } from "react";
import { Dimensions, View } from "react-native";

type CardProps = {
    children: ReactNode;
    height?: number | '100%';
    width?: number | '100%';
    marginBottom?: number;
    marginTop?: number;
    backgroundColor?: string;
}

const { width: windowWidth } = Dimensions.get('window')

const Card = ({
    children,
    height = "100%",
    width = windowWidth,
    marginBottom = 10,
    marginTop = 0,
    backgroundColor = 'white',
}: CardProps) => {
    return (
        <View
            style={{
                height,
                width,
                elevation: 3,
                padding: 10,
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                shadowColor: 'black',
                backgroundColor,
                borderRadius: 4,
                marginBottom,
                marginTop,
            }}
        >
            {children}
        </View>
    );
}

export default Card;