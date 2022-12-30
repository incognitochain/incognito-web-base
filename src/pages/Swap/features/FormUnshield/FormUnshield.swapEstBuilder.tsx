import { BigNumber } from 'bignumber.js';
import { NETWORK_ID_BY_EXCHANGE_SHOR_NETWORK_TYPE } from 'constants/networkID';
import SelectedPrivacy from 'models/model/SelectedPrivacyModel';

import { IReqEstSwapFee, IRespEstSwapEachExchange } from './FormUnshield.inteface';
import { ISwapExchangeData, ISwapFee, NetworkTypePayload, SwapExchange } from './FormUnshield.types';

const getExchangeName = (exchange: SwapExchange) => {
  if (exchange === SwapExchange.PANCAKE_SWAP) {
    return 'PancakeSwap';
  }
  if (exchange === SwapExchange.UNISWAP) {
    return 'Uniswap';
  }
  if (exchange === SwapExchange.CURVE) {
    return 'Curve';
  }
  if (exchange === SwapExchange.PDEX) {
    return 'Incognito';
  }
  if (exchange === SwapExchange.SPOOKY) {
    return 'Spooky';
  }
  if (exchange === SwapExchange.JOE) {
    return 'Trader JOE';
  }

  if (exchange === SwapExchange.TRISOLARIS) {
    return 'Trisolaris';
  }

  if (exchange === SwapExchange.INTER_SWAP) {
    return 'Inter Swap';
  }

  return exchange;
};

const combineExchange = ({
  data,
  token,
  network,
  networkText,
}: {
  data: any;
  token: SelectedPrivacy;
  network: NetworkTypePayload;
  networkText: string;
}) => {
  let exchange: ISwapExchangeData[] = [];
  const networkID = NETWORK_ID_BY_EXCHANGE_SHOR_NETWORK_TYPE[network];
  const nonCheckUnified = [NetworkTypePayload.INCOGNITO, NetworkTypePayload.INTER_SWAP].includes(network);
  if (data?.hasOwnProperty(network)) {
    let incTokenID = token.tokenID;
    if (token?.isUnified && !nonCheckUnified) {
      const childToken = token?.listUnifiedToken?.find((token: any) => token?.networkID === networkID);
      incTokenID = childToken?.tokenID || '';
    }
    const exchanges = data[network];
    if (Array.isArray(exchanges)) {
      exchange = exchanges.map((exchange: any) =>
        parseExchangeDataModelResponse(exchange, networkText, networkID, incTokenID, token)
      );
    }
  }
  return exchange || [];
};

// Parse fee data from api estimate swap fee
const parseFeeDataModelResponse = (fees: IReqEstSwapFee[]) => {
  const data: ISwapFee[] = [];
  if (!fees?.length) return [];
  for (let i = 0; i < fees?.length; i++) {
    data.push({
      amount: fees[i]?.amount || 0,
      tokenId: fees[i]?.tokenid || '',
      amountInBuyToken: new BigNumber(fees[i]?.amountInBuyToken || 0).toString(),
    });
  }
  return data;
};

// Parse data from api estimate swap fee
const parseExchangeDataModelResponse = (
  // Data response from api estimate swap fee
  data: IRespEstSwapEachExchange,
  // Swap network name
  networkName: string,
  // Swap networkID
  networkID: number,
  // Child buy tokenId
  incTokenID?: string,

  token?: SelectedPrivacy // sell token
) => {
  let exchangeName = `${getExchangeName(data?.AppName)} (${networkName})`;

  // parse amount to number
  const amountIn = new BigNumber(data?.AmountIn || 0).toNumber();
  const amountOut = new BigNumber(data?.AmountOut || 0).toNumber();
  const amountOutRaw = new BigNumber(data?.AmountOutRaw || 0).toNumber();

  // parse fee
  const fee = (data?.Fee || []) as any;
  const fees = parseFeeDataModelResponse(fee) || [];

  // contract supported swap pApps
  let callContract = data?.CallContract || '';
  let callData = data?.Calldata || '';
  let poolPairs = data?.PoolPairs || [];
  let feeAddress = data?.FeeAddress || '';

  const tradePathStr = typeof data.Paths === 'string' ? data.Paths : '';

  // handle case INTER SWAP
  const appName = data?.AppName;
  const isInterSwap = appName.toLowerCase().includes(SwapExchange.INTER_SWAP);
  const tradePaths: string[][] = [];
  let isInterFistBatchPDex = false;
  let interSwapData = undefined;
  if (isInterSwap) {
    exchangeName = getExchangeName(data?.AppName);
    // format batch Inter Swap
    const respDetails: IRespEstSwapEachExchange[] = data?.Details;
    if (respDetails && !!respDetails.length) {
      const firstBatch = respDetails[0];
      const secondBatch = respDetails[1];
      callContract = firstBatch?.CallContract;
      callData = firstBatch?.Calldata;
      isInterFistBatchPDex = firstBatch.AppName.toLowerCase().includes(SwapExchange.PDEX);
      respDetails.forEach((trade) => {
        if (trade.Paths) {
          tradePaths.push(typeof trade.Paths === 'string' ? [trade.Paths] : trade.Paths);
        }
      });

      let pAppName = isInterFistBatchPDex ? secondBatch?.AppName : firstBatch.AppName;
      let pAppNetwork = isInterFistBatchPDex ? secondBatch?.PAppNetwork : firstBatch.PAppNetwork;

      incTokenID = token?.tokenID;
      networkID = NETWORK_ID_BY_EXCHANGE_SHOR_NETWORK_TYPE[firstBatch?.PAppNetwork]
        ? NETWORK_ID_BY_EXCHANGE_SHOR_NETWORK_TYPE[firstBatch?.PAppNetwork]
        : token?.networkID || 0;
      if (token?.isUnified && !isInterFistBatchPDex) {
        const childToken = token?.listUnifiedToken?.find((token: any) => token?.networkID === networkID);
        if (childToken?.networkID && childToken?.tokenID) {
          networkID = childToken.networkID;
          incTokenID = childToken?.tokenID;
        }
      }

      if (isInterFistBatchPDex) {
        poolPairs = firstBatch.PoolPairs;
      } else {
        feeAddress = firstBatch?.FeeAddress;
      }

      interSwapData = {
        midOTA: data?.MidOTA,
        midToken: data?.MidToken,
        isInterFistBatchPDex,
        pdexMinAcceptableAmount: new BigNumber(firstBatch?.AmountOutRaw || 0).toString(),
        pAppName,
        pAppNetwork,
      };
    }
  }

  const exchangeData: ISwapExchangeData = {
    // amount
    amountIn,
    amountOut,
    amountOutRaw,

    // exchange
    appName,
    exchangeName,

    // check
    isInterSwap,

    callContract,
    callData,

    // fee
    fees,
    feeAddress,
    feeAddressShardID: data.FeeAddressShardID,

    incTokenID: incTokenID || '',

    poolPairs,
    networkID,
    expectedAmount: data?.AmountOutPreSlippage || '0',
    rate: data?.Rate || '1',
    impactAmount: data?.ImpactAmount ? Number(data?.ImpactAmount || 0) : null,

    routes: data?.Paths || [],

    tradePathStr,

    groupPaths: [],
    interSwapData,
  };
  return exchangeData;
};

export { combineExchange };
