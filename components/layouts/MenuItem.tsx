import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { TouchableOpacity } from "react-native"
import { menuItemProps } from "../../types/menuitemprops"

export const MenuItem = ({ page, doNavigate }: menuItemProps) => {
    const [containerSize, setContainerSize] = React.useState<number>()

    return (
        <TouchableOpacity
            style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={() => doNavigate(page.destination)}
            onLayout={layoutEvent =>
                setContainerSize(layoutEvent.nativeEvent.layout.width)
            }
        >
            <Ionicons
                name={page.ioniconstring as any}
                size={(containerSize ? containerSize - 10 : 0) || 0}
                color="#2F80ED"
            />
        </TouchableOpacity>
    )
}