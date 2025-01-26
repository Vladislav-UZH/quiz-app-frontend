import { authApi } from "~/shared";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAuthStore();

  if (store.user.username && store.getAuthToken()) {
    try {
      await authApi.current();

      return abortNavigation();
    } catch (e) {
      return;
    }
  }
});
