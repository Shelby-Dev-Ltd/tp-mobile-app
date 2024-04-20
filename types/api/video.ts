type VideoResponse =
    {
        data?: {
            media: {
                id: number;
                type: string;
                url: string;
            };
        };
        error?: any,
        status?: number | string,
    }