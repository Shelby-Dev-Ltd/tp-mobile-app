import { StyleSheet, Text, View } from "react-native";
import { recordCardStyles } from "../../../styles/recordCard";
import { Entypo } from "@expo/vector-icons";

type cardProps = {
    location: String,
    date: String
}

const RecordCard = ({ location, date }: cardProps) => {
    return (
        <View style={[recordCardStyles.card, recordCardStyles.shadowProp]}>
            <View style={recordCardStyles.headingContainer}>
                <Entypo name={"location-pin"} size={40} color="black" />
                <Text style={recordCardStyles.heading}>
                    {location}
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
        </View>
    );
}

export default RecordCard;
