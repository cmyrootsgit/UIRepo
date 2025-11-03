import { baseHttpClient } from "../httpClient/baseHttpClient";
import { UserProfile } from "./profile";

// Root API response
export interface UserDetailsResponse {
  status: string;
  code: number;
  message: string;
  data: UserDetails;
}

// Main user object
export interface UserDetails {
  _id: string;
  id: string;
  CreatedBy: string;
  UpdatedBy: string;
  FirstName: string;
  LastName: string;
  Email: string;
  SocialLogin: string | null;
  Gender: number;
  SecurityQuestion1: number;
  SecurityAnswer1: string;
  SecurityQuestion2: number;
  SecurityAnswer2: string;
  LoginFailedCount: number;
  LastLoginFailed: boolean;
  Locked: boolean;
  Active: boolean;
  ResetPasswordAtLogin: boolean;
  AuthToken: string;
  UserType: number;
  IsFirstTimeLogin: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  profile: UserProfile;
}

// API call
export const userService = {
  async getUserDetails(userId: string): Promise<UserDetailsResponse> {
    const response = await baseHttpClient.get<UserDetailsResponse>(
      `/user/userDetails/${userId}`
    );
    return response;
  },
};
