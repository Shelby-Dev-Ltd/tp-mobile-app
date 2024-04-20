type VideoResponse =
    {
        data?: {
            media: {
                id: number;
                type: string;
                url: string;
            };
            record: {
                id: number;
                userId: number;
                mediaId: number;
                analyticsId: number;
            };
        };
        error?: any,
        status?: number | string,
    }