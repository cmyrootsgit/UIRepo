// api/services/relative.ts
import { baseHttpClient } from "../httpClient/baseHttpClient";
import { RelativeFromAPI, RelativeRequest, RelativesResponse } from "../../types/relativeTypes";

export const fetchRelatives = async (payload: RelativeRequest): Promise<RelativeFromAPI[]> => {
    const res = await baseHttpClient.post<RelativesResponse>(
        `/ai/relatives/suggestions`,
        payload
    );

    return res.data.relatives;
};