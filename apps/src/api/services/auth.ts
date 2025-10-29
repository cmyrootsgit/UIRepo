import { jwtDecode } from "jwt-decode";
import { showSnackbar } from "../../common/globalSnackbar";
import { baseHttpClient } from "../httpClient/baseHttpClient";


export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    code: number;
    message: string;
    data?: {
        token: string;
        user?:JwtPayload;
    };
}

export interface JwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: number;
  iat: number;
  exp: number;
}


class AuthService {
    public async loginWithEmail(payload: LoginRequest): Promise<LoginResponse> {
        try {
            // Call API
            const response = await baseHttpClient.post<LoginResponse>("/user/login/", payload);

            // Check if token exists
            if (response.data?.token) {
                const token = response.data.token;

                // Decode JWT to get user info
                const decoded: JwtPayload = jwtDecode(token);


                showSnackbar(response.message || "Login successful", { variant: "success" });

                // Optionally return decoded info along with token
                return {
                    ...response,
                    data: { ...response.data, user: decoded },
                };
            } else {
                showSnackbar(response.message || "Login failed", { variant: "error" });
                return response;
            }
        } catch (error: any) {
            showSnackbar(error.message || "Unable to connect to server", { variant: "error" });
            return { status: "ERROR", code: 500, message: error.message };
        }
    }

    public logout(navigate?: (path: string) => void): void {
        // Clear all stored auth and user info
        localStorage.removeItem("token");

        showSnackbar("Logged out successfully", { variant: "info" });

        // Redirect to login page if navigate function is passed
        if (navigate) {
            navigate("/");
        }
    }


    public getToken(): string | null {
        return localStorage.getItem("token");
    }

    public getUserId(): string | null {
        return localStorage.getItem("userId");
    }

    public isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export const authService = new AuthService();
