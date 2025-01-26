import { authApi, BaseApi } from "~/shared";

export default defineNuxtRouteMiddleware(async (to, from) => {
  //   const auth = useAuthStore();
  //   const token = auth.getAuthToken();
  //   try {
  //     if (token) {
  //       BaseApi.setAuthorizationHeader(token);
  //       //   const user = await authApi.current();
  //       //   auth.setUser(user);
  //       console.log("name", to.name);
  //       const dashboardPath = "/dashboard/quizzes";
  //       if (to.path !== dashboardPath) {
  //         return navigateTo("/dashboard");
  //       }
  //     }
  //   } catch (error) {
  //     return;
  //   }
});
