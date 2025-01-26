import { authApi } from "~/shared";
useAuthStore;
export function useAuthFeatures() {
  const router = useRouter();

  const store = useAuthStore();

  const decorator = (handler: () => Promise<unknown>) => {
    try {
      return async (value) => await handler(value);
    } catch (e) {
      console.log(e);
    }
  };

  const register = async ({ username, password }) => {
    const data = await authApi.register({ username, password });

    store.setUser({
      username: data.user.userName,
      score: data.user.score,
      role: data.user.role,
    });
    store.setAuthToken(data.accessToken);
    store.setRefreshToken(data.refreshToken);

    router.push("/dashboard");
  };

  const login = async ({ username, password }) => {
    const data = await authApi.login({ username, password });

    store.setUser({
      username: data.user.userName,
      score: data.user.score,
      role: data.user.role,
    });
    store.setAuthToken(data.accessToken);
    store.setRefreshToken(data.refreshToken);

    router.push("/dashboard");
  };
  const logout = async () => {
    await authApi.logout();

    store.$reset();
    router.push("/auth/signin");
  };
  const refresh = async () => {
    return;
  };

  return {
    user: store.user,
    accessToken: store.accessToken,
    refreshToken: store.refreshToken,
    register,
    login,
    logout,
    refresh,

    // register: decorator(register),
    // login: decorator(login),
    // logout: decorator(logout),
    // refresh: decorator(refresh),
  };
}
