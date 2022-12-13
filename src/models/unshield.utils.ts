import { IFee, IUserFee } from 'services/rpcClient';

const unshieldFeeBuilder = (data: any): IUserFee | undefined => {
  let feeType = data?.TokenFees ? data.TokenFees : data.PrivacyFees;
  if (!feeType) {
    feeType = {
      Level1: '0',
    };
  }
  const fee: IFee = {
    level1: feeType.Level1,
    level2: feeType.Level2,
  };

  const estimateData = data.EstimateReceivedAmount || {};
  const estimateFee = estimateData?.Fee || 0;
  const estimatedBurnAmount = estimateData?.BurntAmount || 0;
  const estimatedExpectedAmount = estimateData?.ExpectedAmount || 0;

  return {
    fee,
    feeAddress: data.FeeAddress,
    centralizedAddress: data.Address,
    id: data.ID,
    isUseTokenFee: !!data?.TokenFees,
    estimateFee,
    estimatedBurnAmount,
    estimatedExpectedAmount,
    minUnshield: data?.MinUnshield || 0,
    feeAddressShardID: data?.FeeAddressShardID,
  };
};

export { unshieldFeeBuilder };
