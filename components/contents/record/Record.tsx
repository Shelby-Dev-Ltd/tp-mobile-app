import React from "react";
import { FlatList, PanResponder, RefreshControl, ToastAndroid, View } from "react-native";
import RecordCard from "./RecordCard";
import { Record as RecordType } from "../../../types/record";
import { NavigationType } from "../../../types/navigation";

type RecordProps = {
    navigation: NavigationType;
    records: RecordType[];
    isLoading: boolean;
    onRefresh: () => void;
}

const Record = ({ navigation, records, isLoading, onRefresh }: RecordProps) => {

    const panResponder = (id: number) => {
        let dx = 0;
    
        return PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (_, gestureState) => {
            dx = gestureState.dx;
          },
          onPanResponderRelease: (_, gestureState) => {
            if (dx > 50) {
              deleteRecord(id);
            }
          },
        });
      };

    const deleteRecord = async (id: number) => {
        const response = await fetch(`/records/${id}`, {
            method: 'DELETE',
        });
        if(response.status !== 200) {
            console.error(response.status);
            ToastAndroid.show('Failed to delete', ToastAndroid.LONG);
        }
    };

    return (
        <View>
            
            <FlatList
            data={records}
            renderItem={({item}) => 
                <View {...panResponder(item.id).panHandlers}>
                    <RecordCard
                    id={item.id}
                    address={item.address}
                    date={item.date}
                    isAnalyzed={item.analytics.id !== 1 ? true : false}
                    onClick={() => navigation.navigate("recordDetail", { id: item.id })}
                    deleteRecord={deleteRecord}
                    />
                </View>
                }
            keyExtractor={item => item.id.toString()}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                    colors={['#2F80ED']}
                />
            }
            />
        </View>
    );
}

export default Record;
