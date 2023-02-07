import { AxiosInstance } from 'axios';
import { ICollection, IMapTokens, INFT, mapperCollections, mapperNFTs, mapperTokens } from 'pages/Pnft';
import createAxiosInstance from 'services/axios';

import { isMainnet } from '../config';

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

interface ITokenQuery {
  slug: string;
  page?: number;
  query?: string;
  traits?: string[];
  hasAsks?: boolean;
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
      .get(`papps/pnft/collections?filters=${encodeURIComponent(paramString)}`)
      .then((resp: any) => mapperCollections(resp));
  }

  async getCollectionTokens({
    slug,
    page = 0,
    query = '',
    traits = [],
    hasAsks = true,
  }: ITokenQuery): Promise<IMapTokens> {
    const params = {
      page,
      query,
      traits,
      hasAsks,
    };
    const paramString = JSON.stringify(params);

    return this.http
      .get(`papps/pnft/collections/${slug}/tokens?filters=${encodeURIComponent(paramString)}`)
      .then((resp: any) => mapperTokens(resp));
  }

  estimateFee({
    contractAddress,
    nftIDs,
    burnTokenID,
    burnAmount,
    recipient,
  }: {
    contractAddress: string;
    nftIDs: string[];
    burnTokenID: string;
    burnAmount: string;
    recipient: string;
  }) {
    const nftIDStr = nftIDs.join(',');
    return this.http.get(
      `papps/pblur/estimatebuyfee?contract=${contractAddress}&burntoken=${burnTokenID}&burnamount=${burnAmount}&nftids=${nftIDStr}&recipient=${recipient}`
    );
  }

  submitBuyTx({ txRaw, feeRefundOTA }: { txRaw: string; feeRefundOTA: string }) {
    return this.http.post('papps/pblur/submitbuytx', {
      TxRaw: txRaw,
      FeeRefundOTA: feeRefundOTA,
    });
  }

  async getAccountNfts(address: string): Promise<INFT[]> {
    const chain = isMainnet ? 'eth' : 'goerli';
    return this.http.get(`papps/pnft/nft-list?address=${address}?chain=${chain}`).then((resp: any) => mapperNFTs(resp));
  }
}

const rpcPBlur = new RpcPBlur();

export default rpcPBlur;
