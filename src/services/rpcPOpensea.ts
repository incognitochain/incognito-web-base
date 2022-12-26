import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import createAxiosInstance from 'services/axios';

const DEFAULT_LIMIT = 20;

class RpcPOpensea {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_SERVICE });
  }

  getCollections() {
    return this.http.get('papps/opensea/collections');
  }

  getNFTs(contract: string, limit?: number) {
    return this.http.get(
      `papps/opensea/collection-assets?contract=${contract}&limit=${limit || DEFAULT_LIMIT}&offset=0`
    );
  }

  getNFTDetail(contract: string, tokenId: string) {
    return this.http.get(`papps/opensea/nft-detail?contract=${contract}&nftid=${tokenId}`);
  }

  estimateFee(contract: string, tokenId: string, burntoken: string, burnamount: string, recipient: string) {
    return this.http.get(
      `papps/opensea/estimatebuyfee?contract=${contract}&burntoken=${burntoken}&burnamount=${burnamount}&nftid=${tokenId}&recipient=${recipient}`
    );
  }
}

const rpcPOpensea = new RpcPOpensea();

const getPOpeanseaCollections = async (): Promise<any> => {
  const response = await rpcPOpensea.getCollections();
  return response;
};

const getPOpeanseaNFTs = async (contract: string, limit?: number): Promise<any> => {
  const response = await rpcPOpensea.getNFTs(contract, limit);
  return response;
};

const getPOpeanseaNFTDetail = async (contract: string, tokenId: string): Promise<any> => {
  const response = await rpcPOpensea.getNFTDetail(contract, tokenId);
  return response;
};

const postEstimateFee = async (
  contract: string,
  tokenId: string,
  burntoken: string,
  burnamount: string,
  recipient: string
): Promise<any> => {
  const response = await rpcPOpensea.estimateFee(contract, tokenId, burntoken, burnamount, recipient);
  return response;
};

export { getPOpeanseaCollections, getPOpeanseaNFTDetail, getPOpeanseaNFTs, postEstimateFee };
export default rpcPOpensea;
