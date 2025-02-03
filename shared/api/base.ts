import axios from "axios";

interface RestOperationParams {
  path: string;
  data?: object;
  query?: object;
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
