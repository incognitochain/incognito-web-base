import { AxiosInstance } from 'axios';
import { ENVS } from 'config';

import createAxiosInstance from './axios';

class ApiExplorerService {
  http: AxiosInstance;
  constructor() {
    const url = ENVS.REACT_APP_EXPLORER_SERVICE_URL;
    this.http = createAxiosInstance({ baseURL: url });
  }

  async getLandingValidatorData(): Promise<any> {
    return await this.http.get('api/v1/explorer/landing-validator-data');
  }
}

const apiExplorerService = new ApiExplorerService();

export default apiExplorerService;
