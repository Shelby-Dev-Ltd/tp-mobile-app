import useSWR from "swr";
import { Record, RecordWithAnalytics } from "../types/record";
import axios from "axios";

const fetcher = async () => {
    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records`);
        const data: ApiResponse = response.data;

        if (data.error) throw Error(data.status.toString());

        return data.data.records as Record[];

    } catch (e) {
        console.error(e);
    }
};

const useRecords = () => {
    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records`, fetcher)

    return { data, error, isLoading, mutate };
}

const useRecordSingle = (id: number) => {
    const fetcher = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records/${id}`);
            const responseData: ApiResponse = response.data;

            const result = responseData.data || {};

            return result as RecordWithAnalytics;

        } catch (e) {
            console.error(e);
        }
    };

    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records/${id}`, fetcher)

    return { data, error, isLoading, mutate };
}

export { useRecords, useRecordSingle }