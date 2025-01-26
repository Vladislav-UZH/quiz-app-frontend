type User = {
  username: string;
  role: string;
  score: number;
};
const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
    user: {
      username: "",
      role: "",
      score: 0,
    },
  }),

  actions: {
    getAuthToken() {
      const localStorageToken = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (!localStorageToken) {
        return null;
      }

      if (!this.accessToken) {
        return JSON.parse(localStorageToken);
      }

      return this.accessToken;
    },
    setAuthToken(token: string) {
      localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));

      this.accessToken = token;
    },
    setRefreshToken(token: string) {
      localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(token));

      this.refreshToken = token;
    },
    setUser(user: User) {
      this.user = { ...this.user, ...user };
    },
  },
});
