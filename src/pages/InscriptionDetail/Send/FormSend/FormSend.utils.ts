import format from 'utils/format';
const { ACCOUNT_CONSTANT } = require('incognito-chain-web-js/build/web/wallet');

const getNetworkFee = () => {
  const networkPRVFee = format
    .formatAmount({
      originalAmount: ACCOUNT_CONSTANT.MAX_FEE_PER_TX,
      decimals: 9,
      clipAmount: true,
    })
    .toString();

  return networkPRVFee;
};

export { getNetworkFee };
