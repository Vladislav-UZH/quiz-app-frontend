export function useAuthFeatures() {
  const { $api } = useNuxtApp();

  const router = useRouter();

  const store = useAuthStore();

  const register = async ({ username, password }) => {
    const data = await $api.auth.register({ username, password });

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
    const data = await $api.auth.login({ username, password });

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
    await $api.auth.logout();

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
  };
}
