import SelectedPrivacy from 'models/model/SelectedPrivacyModel';
import CONSTANT_COMMONS from 'pages/IncWebWallet/constants/common';
import CONSTANT_CONFIGS from 'pages/IncWebWallet/constants/config';
import React from 'react';
import { useSelector } from 'react-redux';
import { ellipsisCenter } from 'utils';
import format from 'utils/format';

import { getFollowTokenSelectedTokenSelector } from '../../state/followTokenSelected.selectors';
import { IHistoryItem } from '../HistoryItem/HistoryItem.interface';

const { PRVIDSTR } = require('incognito-chain-web-js/build/web/wallet');

export const getNetworkName = (selectedPrivacy: SelectedPrivacy) => {
  const { tokenID, networkName = '', network } = selectedPrivacy;
  let _network = network;
  if (tokenID === PRVIDSTR) {
    _network = networkName;
  }
  return `${_network} network`;
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const selectedPrivacy: SelectedPrivacy = useSelector(getFollowTokenSelectedTokenSelector);
  const {
    tokenID,
    isVerified,
    isBep2Token,
    isErc20Token,
    isPolygonErc20Token,
    isMainETH,
    isMainBSC,
    isMainMATIC,
    contractID,
    pDecimals,
    incognitoTotalSupply,
    symbol,
  } = selectedPrivacy;

  const link = () => {
    if (isErc20Token || isMainETH) {
      return `${CONSTANT_CONFIGS.ETHERSCAN_URL}/token/${contractID}`;
    }
    if (isBep2Token || isMainBSC) {
      return `${CONSTANT_CONFIGS.BSCSCAN_URL}/token/${contractID}`;
    }
    if (isPolygonErc20Token || isMainMATIC) {
      return `${CONSTANT_CONFIGS.POLYGONSCAN_URL}/token/${contractID}`;
    }
    return '';
  };

  const infosFactories: IHistoryItem[] = [
    {
      title: 'Origin',
      desc: getNetworkName(selectedPrivacy),
    },
    {
      title: 'Original Ticker',
      desc: symbol || '',
      link: isBep2Token ? `${CONSTANT_CONFIGS.BINANCE_EXPLORER_URL}/asset/${symbol}` : '',
    },

    {
      title: 'Coin ID',
      desc: ellipsisCenter({ limit: 7, str: tokenID }),
      copyData: tokenID,
    },
    {
      title: 'Contract ID',
      desc: ellipsisCenter({ limit: 8, str: contractID }),
      link: link(),
      disabled: !contractID,
    },
    {
      title: 'Coin supply',
      desc: incognitoTotalSupply
        ? format.formatAmount({
            decimals: pDecimals,
            originalAmount: incognitoTotalSupply,
          })
        : '',
    },
  ];

  if (tokenID === PRVIDSTR) {
    const tokenChildETH = selectedPrivacy?.listChildToken.find(
      (x: SelectedPrivacy) => x.currencyType === CONSTANT_COMMONS.PRIVATE_TOKEN_CURRENCY_TYPE.ERC20
    );
    const tokenChildBSC = selectedPrivacy?.listChildToken.find(
      (x: SelectedPrivacy) => x.currencyType === CONSTANT_COMMONS.PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20
    );
    if (tokenChildETH && tokenChildETH?.contractID) {
      infosFactories.push({
        title: 'ETH ID',
        desc: ellipsisCenter({ limit: 8, str: tokenChildETH?.contractID }),
        link: `${CONSTANT_CONFIGS.ETHERSCAN_URL}/token/${tokenChildETH?.contractID}`,
      });
    }

    if (tokenChildBSC && tokenChildBSC?.contractID) {
      infosFactories.push({
        title: 'BSC ID',
        desc: ellipsisCenter({ limit: 8, str: tokenChildBSC?.contractID }),
        link: `${CONSTANT_CONFIGS.BSCSCAN_URL}/token/${tokenChildBSC?.contractID}`,
      });
    }
  }

  return <WrappedComponent {...{ ...props, infosFactories, isVerified, selectedPrivacy }} />;
};

export default enhance;
