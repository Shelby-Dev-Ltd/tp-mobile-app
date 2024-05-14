import { ReactNode } from "react";
import { Dimensions, View } from "react-native";

type CardProps = {
    children: ReactNode;
    maxHeight?: number | '100%';
    height?: number | '100%';
    width?: number | '100%';
    marginBottom?: number;
    marginTop?: number;
    backgroundColor?: string;
    paddingBottom?: number;
}

const { width: windowWidth } = Dimensions.get('window')

const Card = ({
    children,
    height = "100%",
    paddingBottom = 10,
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
                paddingBottom,
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                shadowColor: 'black',
                backgroundColor,
                borderRadius: 4,
                marginBottom,
                marginTop,
                shadowOffset: { height: -2, width: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
            }}
        >
            {children}
        </View>
    );
}

export default Card;