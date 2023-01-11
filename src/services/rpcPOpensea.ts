import { AxiosInstance } from 'axios';
import { API_SERVICE } from 'config';
import createAxiosInstance from 'services/axios';

const DEFAULT_LIMIT = 1000;

class RpcPOpensea {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_SERVICE });
  }

  getCollections() {
    return this.http.get('papps/opensea/collections');
  }

  getCollectionDetail(contract: string) {
    return this.http.get(`papps/opensea/collection-detail?contract=${contract}`);
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

  submitBuyTx({ txRaw, feeRefundOTA }: { txRaw: string; feeRefundOTA: string }) {
    return this.http.post('papps/opensea/submitbuytx', {
      TxRaw: txRaw,
      FeeRefundOTA: feeRefundOTA,
    });
  }

  getStatusTx = (txList: string[]) => {
    return this.http.post('papps/opensea/buystatus', {
      TxList: txList,
    });
  };

  generateOffer = (
    amount: string,
    recipient: string,
    nftid: string,
    contract: string,
    endtime: number
  ): Promise<any> => {
    return this.http.post('papps/opensea/generateoffer', {
      amount,
      recipient,
      nftid,
      contract,
      endtime: Math.floor(endtime / 1000),
      startime: Math.floor(new Date().getTime() / 1000),
    });
  };

  estimateOfferFee = (offer: string, signature: string, burntoken: string, ota: string): Promise<any> => {
    return this.http.post('papps/opensea/estimateofferfee', {
      offer,
      signature,
      burntoken,
      ota,
    });
  };

  submitOfferTx({ txRaw, feeRefundOTA, offer }: { txRaw: string; feeRefundOTA: string; offer: string }): Promise<any> {
    return this.http.post('papps/opensea/submitoffertx', {
      TxRaw: txRaw,
      FeeRefundOTA: feeRefundOTA,
      Offer: offer,
    });
  }

  submitCancelOfferTx({ txRaw, feeRefundOTA }: { txRaw: string; feeRefundOTA: string }): Promise<any> {
    return this.http.post('papps/opensea/submitcanceltx', {
      TxRaw: txRaw,
      FeeRefundOTA: feeRefundOTA,
    });
  }

  getOfferStatusTx = (txList: string[]): Promise<any> => {
    return this.http.post('papps/opensea/offerstatus', {
      TxList: txList,
    });
  };
}

const rpcPOpensea = new RpcPOpensea();

const getPOpeanseaCollections = async (): Promise<any> => {
  const response = await rpcPOpensea.getCollections();
  return response;
};

const getPOpeanseaCollectionDetail = async (contract: string): Promise<any> => {
  const response = await rpcPOpensea.getCollectionDetail(contract);
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

const getPOpenseaStatusTxs = async (txList: string[]): Promise<any> => {
  const response = await rpcPOpensea.getStatusTx(txList);
  return response;
};

export {
  getPOpeanseaCollectionDetail,
  getPOpeanseaCollections,
  getPOpeanseaNFTDetail,
  getPOpeanseaNFTs,
  getPOpenseaStatusTxs,
  postEstimateFee,
};
export default rpcPOpensea;
