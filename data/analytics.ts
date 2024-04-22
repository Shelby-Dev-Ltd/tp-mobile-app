import useSWR from "swr";
import { AnalyticsData } from "../types/analytics";
import { RecordAnalysisApiResponse } from "../types/api/recordAnalysisApiResponse";
import { useEffect } from "react";

const fetcher = async () => {
    try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/data`, {
            method: 'POST',
            body: JSON.stringify({
                userId: 1 // TODO: PUT REAL USER ID
            })
        });

        const data: ApiResponse = await res.json();

        if (data.error) throw Error(data.status.toString());

        const result = data.data.monthlyAnalytics as AnalyticsData[] || []

        return result;

    } catch (e) {
        console.error(e);
    }
}

const useAnalytics = () => {
    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/analytics/data`, fetcher)

    return { data, error, isLoading, mutate };
}

const useAnalyticsSingle = (id: number) => {
    const fetcher = async () => {
        try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records/${id}/analytics`);

            const data: ApiResponse = await res.json();

            if (data.error) throw Error(data.status.toString());

            const result = data.data || {}

            return result as AnalyticsData;

        } catch (e) {
            console.error(e);
        }
    }
    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records/${id}/analytics`, fetcher)

    return { data, error, isLoading, mutate };
}

export { useAnalytics, useAnalyticsSingle }