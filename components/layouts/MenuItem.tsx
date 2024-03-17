import { Ionicons } from "@expo/vector-icons"
import React, { useEffect } from "react"
import { TouchableOpacity } from "react-native"
import { menuItemProps } from "../../types/menuitemprops"

export const MenuItem = ({ page, doNavigate, isOpen }: menuItemProps) => {
    const [containerSize, setContainerSize] = React.useState<number>()

    return (
        <TouchableOpacity
            style={isOpen ?
                {
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.5,
                } : // Not Open
                {
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 1,
                }
            }
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