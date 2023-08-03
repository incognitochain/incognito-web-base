import axios from 'axios';
import { INSCRIPTION_URL } from 'config';

// import CONSTANT_CONFIGS from 'pages/IncWebWallet/constants/config';
import { CustomError, ErrorCode, ExHandler } from './exception';

export const INSCRIPTION_BASE_URL = `${INSCRIPTION_URL}api`;
const HEADERS = { 'Content-Type': 'application/json' };
const TIMEOUT = 20000;

const instance = axios.create({
  // baseURL: CONSTANT_CONFIGS.COINS_SERVICE_URL,
  baseURL: INSCRIPTION_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    ...HEADERS,
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const newConfig = {
      ...config,
    };
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    const result = res?.data?.Result || res?.data;
    return Promise.resolve(result);
  },
  (errorData) => {
    const errResponse = errorData?.response;

    // can not get response, alert to user
    if (errorData?.isAxiosError && !errResponse) {
      return new ExHandler(new CustomError(ErrorCode.network_make_request_failed)).throw();
    }

    // get response of error
    // wrap the error with CustomError to custom error message, or logging
    const data = errResponse?.data;
    if (data && data.Error) {
      throw new CustomError(data.Error?.Code, {
        name: CustomError.TYPES.API_ERROR,
        message: data.Error?.Message,
      });
    }

    return Promise.reject(errorData);
  }
);

export default instance;
