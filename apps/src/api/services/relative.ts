// api/services/relative.ts
import { baseHttpClient } from "../httpClient/baseHttpClient";
import { RelativeRequest, RelativesResponseData, RelativesResponse } from "../../types/relativeTypes";

export const fetchRelatives = async (payload: RelativeRequest): Promise<RelativesResponseData> => {
    const res = await baseHttpClient.post<RelativesResponse>(
        `/ai/relatives/suggestions`,
        payload
    );

    return res;
};