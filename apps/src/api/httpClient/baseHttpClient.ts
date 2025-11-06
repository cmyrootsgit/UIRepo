export class BaseHttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: string,
    url: string,
    body?: any,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(this.baseUrl + url, {
      ...options,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    let responseData: any;
    try {
      responseData = await response.json();
    } catch {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errorMessage = responseData?.message || responseData || `HTTP error! status: ${response.status}`;
      if (response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = '/';
      }
      throw new Error(errorMessage);
    }

    return responseData as T;
  }

  get<T>(url: string, options?: RequestInit) {
    return this.request<T>("GET", url, undefined, options);
  }

  post<T>(url: string, body: any, options?: RequestInit) {
    return this.request<T>("POST", url, body, options);
  }

  put<T>(url: string, body: any, options?: RequestInit) {
    return this.request<T>("PUT", url, body, options);
  }

  delete<T>(url: string, options?: RequestInit) {
    return this.request<T>("DELETE", url, undefined, options);
  }
}

const API_URL = "http://3.208.10.88:8081/api";
export const baseHttpClient = new BaseHttpClient(API_URL);
