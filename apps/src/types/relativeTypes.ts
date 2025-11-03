export interface RelativeFromAPI {
    userId: string;
    name: string;
    relation: string;
}

export interface RelativesResponse {
    status: string;
    code: number;
    message: string;
    data: {
        relatives: RelativeFromAPI[];
    };
}

export interface RelativeRequest {
    userId: string;
    name: string;
}