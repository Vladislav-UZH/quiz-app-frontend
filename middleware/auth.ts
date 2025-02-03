export default defineNuxtRouteMiddleware(async (to, from) => {
  const loginPath = "/auth/signin";
  const { $api } = useNuxtApp();
  const store = useAuthStore();

  if (store.getAuthToken()) {
    try {
      await $api.auth.current();
    } catch (e) {
      if (from.path !== loginPath) {
        return navigateTo(loginPath);
      }
      return abortNavigation("Server error");
    }
    return;
  }

  if (from.path !== loginPath) {
    return navigateTo(loginPath);
  }
});
