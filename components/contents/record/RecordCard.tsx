import { Pressable, StyleSheet, Text, View } from "react-native";
import { recordCardStyles } from "../../../styles/recordCard";
import { Entypo } from "@expo/vector-icons";

type cardProps = {
    address: string,
    longitude: string,
    latitude: string,
    date: string,
    id: number, //record id
    onClick: (id: number) => void,
}

const RecordCard = ({ id, address, longitude, latitude, date, onClick }: cardProps) => {
    return (
        <Pressable
            style={[recordCardStyles.card, recordCardStyles.shadowProp, { paddingRight: 50 }]}
            onPress={() => onClick(id)}
        >
            <View style={recordCardStyles.headingContainer}>
                <Entypo name={"location-pin"} size={40} color="black" />
                <Text style={recordCardStyles.heading}>
                    {address}
                </Text>
                <Text style={recordCardStyles.heading}>
                    {longitude + " " + latitude}
                </Text>
            </View>
            <View style={recordCardStyles.dateContainer}>
                <Entypo name={"calendar"} size={20} color="black" />
                <Text>
                    {new Date(date.toString()).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}
                </Text>
            </View>
        </Pressable>
    );
}

export default RecordCard;
