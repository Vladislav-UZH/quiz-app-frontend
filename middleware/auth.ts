import { authApi } from "~/shared";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("hello");

  const store = useAuthStore();

  if (store.user.username && store.getAuthToken()) {
    try {
      await authApi.current();
    } catch (e) {
      return abortNavigation();
    }
    return;
  }

  const loginPath = "/auth/signin";

  if (from.path !== loginPath) {
    return navigateTo(loginPath);
  }
});
