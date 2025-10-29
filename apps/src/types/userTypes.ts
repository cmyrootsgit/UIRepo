export interface UserDetailsResponse {
  status: string;
  code: number;
  message: string;
  data: {
    _id: string;
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
  };
}

export type UserType = {
  _id: string;
  FirstName: string;
  LastName?: string;
  Email?: string;
  ProfileImage?: string;
};
