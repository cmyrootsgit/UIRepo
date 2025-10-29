export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message?: string;
  token?: string;
  _id?: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  SocialLogin?: string;
  Password?: string;
  RetypePassword?: string;
  Gender?: number;
  ClientUserId?: string;
  SecurityQuestion1?: string;
  SecurityAnswer1?: string;
  SecurityQuestion2?: string;
  SecurityAnswer2?: string;
  LoginFailedCount?: number;
  LastLoginFailed?: boolean;
  Locked?: boolean;
  Active?: boolean;
  ResetPasswordAtLogin?: boolean;
  ShouldSerializeId?: boolean;
  UserType?: number;
  ProfileCreated?: boolean;
  IsBaseTreeCompeleted?: boolean;
  IsFamilyNoteAdded?: boolean;
  PhotoPath?: string;
  IsFirstTimeLogin?: boolean;
  UpdatedAt?: number;
  CreatedAt?: number;
  CreatedBy?: string;
  UpdatedBy?: string;
}

export interface UserProfile {
  _id: string;
  PhotoPath?: string | null;
  Location?: string;
  [key: string]: any;
}

export interface AuthUser {
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  AuthToken: string;
  profile?: UserProfile;
  [key: string]: any;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error?: string;
}

