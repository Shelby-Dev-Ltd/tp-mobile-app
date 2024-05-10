import { View } from "react-native";
import Layout from "../layouts/Layout";
import { screenProps } from "../../types/screenprops";
import Record from "../contents/record/Record";
import { useRecords } from "../../data/records";

export default function RecordScreen({ title, navigation, openedPage, route }: screenProps) {

    const { isLoading, mutate, data: records } = useRecords();

    const onRefresh = () => {
        mutate();
    }

    const content =
        (<View style={{ flex: 1 }}>
            <Record
                records={records || []}
                navigation={navigation}
                isLoading={isLoading}
                onRefresh={onRefresh}
                route={route}
            />
        </View>)

    return (
        <Layout openedPage={openedPage} content={content} title={title} navigation={navigation} menuBar={true} />
    );
}