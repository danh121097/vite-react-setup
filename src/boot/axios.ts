import { IAPIResponseError } from '@types';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';

enum ContentType {
  'application/json' = 'application/json'
}

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

interface AxiosConfigHeaders {
  'Content-Type': ContentType;
  ctime?: number;
  sig?: string;
  authorization?: string;
}

const api: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'content-type': 'application/json'
  }
});

api.interceptors.request.use(
  (config: AdaptAxiosRequestConfig) => {
    const token = localStorage.getItem(`${process.env.APP_NAME}_token`);
    config.headers = {
      ...config.headers
    } as AxiosRequestHeaders;

    if (token)
      (
        config.headers as AxiosConfigHeaders
      ).authorization = `Bearer ${token.toString()}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.status === 'success') return response.data;

    if (response.data.error_code === 401) {
      localStorage.removeItem(`${process.env.APP_NAME}_token`);
      location.reload();
    }
    return Promise.reject<IAPIResponseError>(
      response.data || { data: undefined }
    );
  },
  async (error: AxiosError<IAPIResponseError>) => {
    return Promise.reject(error.response?.data || 'Network Error');
  }
);

export default api;
