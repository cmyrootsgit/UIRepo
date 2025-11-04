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
        peopleYouMayKnow: RelativeRequest[]
    };
}

export interface RelativesResponseData {
    data: {
        relatives: RelativeFromAPI[];
        peopleYouMayKnow: RelativeRequest[]
    };
}

export interface RelativeRequest {
    userId: string;
    name: string;
    relation?: string;
}