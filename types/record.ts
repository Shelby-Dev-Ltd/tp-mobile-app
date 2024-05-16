import { AnalyticsData } from "./analytics";
import { MediaData } from "./media";

export type Record = {
    id: number;
    userId: number;
    mediaId: 11;
    address: string;
    longitude: string;
    latitude: string,
    date: string;
    analytics: AnalyticsData,
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
        media: MediaData,
    },
    isAnalyzing: boolean,

}