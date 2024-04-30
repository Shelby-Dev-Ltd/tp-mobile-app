import { FlatList, PanResponder, PanResponderStatic, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { recordCardStyles } from "../../../styles/recordCard";
import { Entypo } from "@expo/vector-icons";
import Card from "../../ui/Card";

type cardProps = {
    address: string,
    date: string,
    id: number, //record id
    isAnalyzed: boolean,
    onClick: (id: number) => void,
    deleteRecord: (id: number) => void,
}

const RecordCard = ({ id, address, date, onClick, isAnalyzed, deleteRecord}: cardProps) => {


    return (
            <TouchableOpacity
                onPress={() => onClick(id)}
            >
                <Card
                    height={160}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            width: '100%',
                            height: '100%',
                            padding: 10,
                        }}
                    >
                        <View style={recordCardStyles.headingContainer}>
                            <Entypo name={"location-pin"} size={40} color="#fc594e" />
                            <Text style={recordCardStyles.heading}>
                                {address}
                            </Text>
                        </View>
                        <View style={recordCardStyles.dateContainer}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    gap: 10,
                                }}
                            >
                                <Entypo name={"calendar"} size={20} color="grey" />
                                <Text
                                    style={{
                                        color: 'grey'
                                    }}
                                >
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
                            <View
                                style={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: 50,
                                    backgroundColor: isAnalyzed ? '#26bf4f' : 'red'
                                }}
                            />
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
    );
}

export default RecordCard;
