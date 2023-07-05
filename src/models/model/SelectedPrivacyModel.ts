import { BigNumber } from 'bignumber.js';
import convert from 'utils/convert';
import format from 'utils/format';

import PToken from './pTokenModel';

class SelectedPrivacy extends PToken {
  amount?: number;
  formatAmount?: string;
  formatPriceByUsd?: string;
  formatPriceByPrv?: string;
  formatAmountNoClip?: string;
  formatBalanceByUsd?: string;

  constructor(pTokenData?: PToken, followTokens?: any) {
    super();
    Object.assign(this, pTokenData);
    const followToken = (followTokens || []).find(({ id }: { id: string }) => id === this.tokenID);
    if (followToken) {
      const { amount } = followToken;
      this.amount = new BigNumber(amount || '0').toNumber();

      const formatPriceByUsd = format.formatAmount({
        humanAmount: this.priceUSD,
        decimals: this.pDecimals,
        decimalDigits: false,
      });

      const formatPriceByPrv = format.formatAmount({
        humanAmount: this.pricePRV,
        decimals: this.pDecimals,
        decimalDigits: false,
      });

      const formatAmount = format.amountVer2({
        originalAmount: Number(amount || 0),
        decimals: this.pDecimals,
      });

      const formatAmountNoClip = format.formatAmount({
        originalAmount: Number(amount || 0),
        decimals: this.pDecimals,
        decimalDigits: true,
        clipAmount: false,
      });

      const formatBalanceByUsd = format.amountVer2({
        originalAmount: convert.toOriginalAmount({
          humanAmount: new BigNumber(convert.toString({ text: formatAmount.toString() }))
            .multipliedBy(convert.toString({ text: formatPriceByUsd }))
            .toString(),
          decimals: this.pDecimals,
        }),
        decimals: this.pDecimals,
      });
      this.formatPriceByUsd = formatPriceByUsd;
      this.formatPriceByPrv = formatPriceByPrv;
      this.formatAmount = formatAmount;
      this.formatAmountNoClip = formatAmountNoClip;
      this.formatBalanceByUsd = formatBalanceByUsd;
      this.incognitoTotalSupply = (this.isIncognitoToken && Number(pTokenData?.totalSupply)) || 0;
    }
  }
}

export default SelectedPrivacy;
