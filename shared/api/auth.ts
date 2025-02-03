import { BaseApi } from ".";
type User = { userName: string; score: number; role: string };

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export class AuthApi {
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
