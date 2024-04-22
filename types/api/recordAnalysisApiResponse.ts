import { AnalyticsData } from "../analytics"

export type RecordAnalysisApiResponse = {
    data?: AnalyticsData;
    error?: any;
    status?: number | string;
}