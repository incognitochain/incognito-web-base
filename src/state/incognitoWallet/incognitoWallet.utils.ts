// @ts-ignore
const { KeyWallet } = require('incognito-chain-web-js/build/wallet');

const getShardIDByAddress = ({ incAddress }: { incAddress: string }) => {
  if (!incAddress) throw 'Please connect incognito wallet';
  const key = KeyWallet.base58CheckDeserialize(incAddress);
  const bytes = key.KeySet.PaymentAddress.Pk;
  const lastByte = bytes[bytes.length - 1];
  return lastByte % 8;
};

export { getShardIDByAddress };
