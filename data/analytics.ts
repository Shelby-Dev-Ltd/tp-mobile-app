import useSWR from "swr";
import { AnalyticsData } from "../types/analytics";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const useAnalytics = () => {
    const fetcher = async () => {
        try {
            const { user } = useAuth();

            const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/data`, {
                userId: user.id,
            });

            const data: ApiResponse = response.data;

            if (data.error) throw Error(data.status.toString());

            const result = data.data.monthlyAnalytics || [];

            return result as AnalyticsData[];
        } catch (e) {
            console.error(e);
        }
    };

    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/data`, fetcher)

    return { data, error, isLoading, mutate };
}

export { useAnalytics }