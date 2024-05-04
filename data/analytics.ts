import useSWR from "swr";
import { AnalyticsData } from "../types/analytics";
import axios from "axios";

const fetcher = async () => {
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/data`, {
            userId: 1 // TODO: PUT REAL USER ID
        });

        const data: ApiResponse = response.data;

        if (data.error) throw Error(data.status.toString());

        const result = data.data.monthlyAnalytics || [];

        return result as AnalyticsData[];
    } catch (e) {
        console.error(e);
    }
};

const useAnalytics = () => {
    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/data`, fetcher)

    return { data, error, isLoading, mutate };
}

export { useAnalytics }