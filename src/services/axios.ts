import axios, { CancelTokenSource } from 'axios';
import { camelCaseKeys } from 'utils/camelcase';

const TIMEOUT = 20000;

const HEADERS = { 'Content-Type': 'application/json' };
export const CANCEL_MESSAGE = 'Request cancelled';
export const CANCEL_KEY = 'cancelPrevious';

interface SourcesMap {
  [key: string]: CancelTokenSource;
}

const sources: SourcesMap = {};
const CancelToken = axios.CancelToken;

const createAxiosInstance = ({ baseURL = '' }: { baseURL: string }) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRBZGRyZXNzIjoiMHgxYzZhMWZlY2M0NDQ5ZjBmN2M5MDQ3MTlhNjU0MDhmYWQ3ZmUzOTJhIiwic2lnbmF0dXJlIjoiMHg3ZDM4MTUwMjY5ZGRhMDM0ZmQ0OGVmZTY0YjI3Mjc1YTNiMWNlYTRhOTY5ODU5ZjBjYTQ1MjJjMzFlNjMzYzdhNjRlNzRlNDJjOTNjZGYzZGJiYTMwNjJiNmQ5NGUwMjkzODkyOTJkOWYxMTQzZWIzODM0NDUwOGEzZjQxNjBiYTFjIiwiaWF0IjoxNjcyOTk2MjU1LCJleHAiOjE2NzU1ODgyNTV9.7cxDRHBslEJoqYC5raVv8lid66mjrmHpTCutAbBVkb4';
  const instance = axios.create({
    baseURL,
    timeout: TIMEOUT,
    headers: {
      Authorization: `Bearer ${token}`,
      ...HEADERS,
    },
  });

  instance.interceptors.request.use(
    (req) => {
      req.headers = {
        ...req.headers,
      };

      const path: string | undefined = req.url;
      if (path && path.includes(CANCEL_KEY)) {
        if (sources[path]) {
          sources[path].cancel(CANCEL_MESSAGE);
        }
        sources[path] = CancelToken.source();
        req.cancelToken = sources[path].token;
      }

      return req;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      const result = res?.data?.Result;
      const error = res?.data?.Error;
      if (error) {
        return Promise.reject(camelCaseKeys(error));
      }
      return Promise.resolve(result);
    },
    (error: any) => {
      if (!error.response) {
        return Promise.reject(error);
      } else {
        const response = error?.response?.data || error;
        let errorMessage = response?.Error || error?.Message || JSON.stringify(error);
        return Promise.reject(camelCaseKeys(errorMessage));
      }
    }
  );

  return instance;
};

export default createAxiosInstance;
