import { AxiosInstance } from 'axios';
import { ICollection, IToken, mapperCollections, mapperTokens } from 'pages/Blur';
import createAxiosInstance from 'services/axios';

type CollectionSortType =
  | 'floor_price'
  | 'volume_fifteen_minutes'
  | 'volume_one_day'
  | 'volume_one_week'
  | 'number_owners'
  | 'total_supply';

type CollectionOrderType = 'desc' | 'asc';

interface ICollectionQuery {
  page?: number;
  sort?: CollectionSortType;
  order?: CollectionOrderType;
  query?: string;
}

class RpcPBlur {
  http: AxiosInstance;

  constructor() {
    this.http = createAxiosInstance({ baseURL: 'http://51.161.117.193:7898/' });
  }

  async getCollections({ page = 0, sort, order, query = '' }: ICollectionQuery): Promise<ICollection[]> {
    const params = {
      page,
      sort: sort || '',
      order: order || '',
      query,
    };
    const paramString = JSON.stringify(params);
    return this.http
      .get(`papps/pblur/collections?filters=${encodeURIComponent(paramString)}`)
      .then((resp: any) => mapperCollections(resp));
  }

  async getCollectionTokens(collectionName: string, cursor?: any): Promise<IToken[]> {
    const params = {
      cursor,
      traits: [],
      hasAsks: true,
    };
    const paramString = JSON.stringify(params);

    return this.http
      .get(`papps/pblur/collections/${collectionName}/tokens?filters=${encodeURIComponent(paramString)}`)
      .then((resp: any) => mapperTokens(resp));
  }
}

const rpcPBlur = new RpcPBlur();

export default rpcPBlur;
