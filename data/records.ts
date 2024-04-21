import useSWR from "swr";
import { Record } from "../types/record";

const fetcher = async () => {
    try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records`);
        const data: ApiResponse = await res.json();

        if (data.error) throw Error(data.status.toString());

        return data.data.records as Record[];

    } catch (e) {
        console.error(e);
    }
}

const useRecords = () => {
    const { data, error, isLoading, mutate } = useSWR(`${process.env.EXPO_PUBLIC_BASE_API_URL}/records`, fetcher)

    return { data, error, isLoading, mutate };
}

export default useRecords