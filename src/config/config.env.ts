import isEmpty from 'lodash/isEmpty';

interface IENVS {
  REACT_APP_ENV: string;
  REACT_APP_API_SERVICE: string;
  REACT_APP_SITE_KEY: string;
}

const defaultEnvs = {
  REACT_APP_ENV: 'production',
  REACT_APP_API_SERVICE: '',
};

export const getEnvs = () => {
  let envs: any = {};
  try {
    const PROCESS_ENV = process.env;
    if (!isEmpty(PROCESS_ENV)) {
      Object.keys(PROCESS_ENV).forEach((key: string) => {
        const value = PROCESS_ENV[key];
        if (value === 'true' || value === 'false') {
          envs[key] = value === 'true';
        } else {
          envs[key] = PROCESS_ENV[key];
        }
        return key;
      });
    }
  } catch (error) {
    console.debug(error);
  } finally {
    envs = isEmpty(envs) ? defaultEnvs : envs;
  }
  return { ...envs, REACT_APP_DOMAIN_URL: window.location.origin };
};

export const ENVS: IENVS = getEnvs();

export const isMainnet: boolean = ENVS.REACT_APP_ENV === 'production';

export const SITE_KEY: string = ENVS.REACT_APP_SITE_KEY;

export const API_SERVICE: string = ENVS.REACT_APP_API_SERVICE;
