import { AnalyticsData } from "./analytics";

export type Record = {
    id: number;
    userId: number;
    mediaId: 11;
    address: string;
    longitude: string;
    latitude: string,
    date: string;
    analyticsId: number,
}

export type RecordWithAnalytics = {
    record: {
        id: number;
        userId: number;
        mediaId: 11;
        address: string;
        longitude: string;
        latitude: string,
        date: string;
        analytics: AnalyticsData,
    },
    isAnalyzing: boolean,

}