import { StyleSheet, Text, View } from "react-native";
import { cardStyles } from "../../styles/card";
import { Entypo } from "@expo/vector-icons";

type cardProps = {
    location: String,
    date: String 
}

const Card = ({location, date} : cardProps) => {
    return (
    <View style={[cardStyles.card, cardStyles.shadowProp]}>
        <View style={cardStyles.headingContainer}>
            <Entypo name={"location-pin"} size={40} color="black" />
            <Text style={cardStyles.heading}>
                {location}
            </Text>
        </View>
        <View style={cardStyles.dateContainer}>
            <Entypo name={"calendar"} size={20} color="black" />
            <Text>
                {date}
            </Text>
        </View>
    </View>
    );
}

export default Card;
