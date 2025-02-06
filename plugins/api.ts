import { BaseApi } from "~/shared";
import { AuthApi } from "~/shared/api/auth";
import { GameApi } from "~/shared/api/game";
import { QuizApi } from "~/shared/api/quiz";

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();
  BaseApi.instance.interceptors.request.use(
    (config) => {
      const token = auth.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api: {
        base: new BaseApi(),
        auth: new AuthApi(new BaseApi()),
        quiz: new QuizApi(new BaseApi()),
        game: new GameApi(new BaseApi()),
      },
    },
  };
});
