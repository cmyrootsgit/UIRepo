import { baseHttpClient } from "../httpClient/baseHttpClient";

export interface UserProfileUpdateRequest {
  FirstName: string;
  LastName: string;
  PhotoContent?: string;
  CurrentLocation: string;
  MaritalStatus: string;
  Gender: string;
  FamilyName: string;
  Location: string;
  AboutMe?: string;
  HighSchool?: string;
  College?: string;
  LinkedInUrl?: string;
  Occupation?: string;
  ContactNumber?: string;
  DateOfBirthString?: string;
}

export interface UserProfileUpdateResponse {
  status: string;
  code: number;
  message: string;
  data: UserProfile;
}

export interface UserProfile {
  _id: string;
  UpdatedAt: string;
  CreatedAt: string;
  CreatedBy: string;
  UpdatedBy: string;
  HighSchool: string;
  College: string;
  LinkedInUrl: string;
  UserId: string;
  PhotoPath: string | null;
  DateOfBirth: number;
  BirthMonthDate: string;
  MaritalStatus: string;
  FamilyName: string;
  AboutMe: string;
  CurrentLocation: string;
  Location: string;
  Occupation: string;
  ContactNumber: string;
  FirstName: string;
  LastName: string;
  DateOfBirthString: string;
  Gender: string;
  PhotoContent: string;
}

export const userProfileService = {
  async updateProfile(userId: string, payload: UserProfileUpdateRequest): Promise<UserProfileUpdateResponse> {
    const response = await baseHttpClient.put<UserProfileUpdateResponse>(
      `/user/userProfile/update/${userId}`,
      payload
    );
    return response;
  },
};
