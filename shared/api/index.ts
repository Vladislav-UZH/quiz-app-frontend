import axios from "axios";
import { useAuthFeatures } from "~/features/auth";

interface RestOperationParams {
  path: string;
  data?: object;
  query?: object;
}

type User = { userName: string; score: number; role: string };

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class BaseApi {
  static instance = axios.create();
  static setAuthorizationHeader(token: string) {
    BaseApi.instance.defaults.headers.Authorization = `Bearer ${token}`;
  }
  constructor() {
    BaseApi.instance.defaults.baseURL = "http://localhost:8080";
  }
  async GET<T>({ path, query = {} }: RestOperationParams): Promise<T> {
    const response = await BaseApi.instance<T>({
      method: "GET",
      url: path,
      params: query,
    });
    return response.data;
  }
  async POST<T>({ path, data, query }: RestOperationParams): Promise<T> {
    const response = await BaseApi.instance.post<T>(path, data, {
      params: query,
    });
    return response.data;
  }
  async PUT<T>({ path, data, query }: RestOperationParams): Promise<T> {
    const response = await BaseApi.instance.put<T>(path, data, {
      params: query,
    });
    return response.data;
  }
  async PATCH<T>({ path, data, query }: RestOperationParams): Promise<T> {
    const response = await BaseApi.instance.patch<T>(path, data, {
      params: query,
    });
    return response.data;
  }
  async DELETE<T>({ path, query }: RestOperationParams): Promise<T> {
    const response = await BaseApi.instance.delete<T>(path, {
      params: query,
    });
    return response.data;
  }
}

class AuthApi {
  constructor(private readonly api: BaseApi) {}

  async register({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const data = await this.api.POST<{
      accessToken: string;
      refreshToken: string;
      user: User;
    }>({
      path: "/auth/register",
      data: { username, password },
    });

    BaseApi.setAuthorizationHeader(data.accessToken);

    return data;
  }

  async login({ username, password }: { username: string; password: string }) {
    const data = await this.api.POST<{
      accessToken: string;
      refreshToken: string;
      user: User;
    }>({
      path: "/auth/login",
      data: { username, password },
    });
    BaseApi.setAuthorizationHeader(data.accessToken);

    return data;
  }
  async logout() {
    return this.api.POST<void>({
      path: "/auth/logout",
    });
  }
  async refresh({ refreshToken }: { refreshToken: string }) {
    return this.api.POST<AuthTokens>({
      path: "/auth/refresh",
      data: { refreshToken },
    });
  }
  async current() {
    return this.api.GET<User>({ path: "/auth/current" });
  }

  // activateInterceptors() {
  //   const auth = useAuthStore();
  //   BaseApi.instance.interceptors.request.use(
  //     (config) => {
  //       const token = auth.getAuthToken();
  //       if (token) {
  //         config.headers.Authorization = `Bearer ${token}`;
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   BaseApi.instance.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     (error) => {
  //       if (error.response && error.response.status === 401) {
  //         // useAuthFeatures().logout();
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   console.log("activated");
  // }
}
export const authApi = new AuthApi(new BaseApi());
