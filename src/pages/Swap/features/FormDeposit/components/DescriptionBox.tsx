import { ReactComponent as CircleIconSVG } from 'assets/svg/circle-icon.svg';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import SelectedPrivacy from '../../../../../models/model/SelectedPrivacyModel';

const Styled = styled.div`
  margin-top: 24px;
  padding: 12px;

  background-color: ${({ theme }) => theme.bg4};
  border-radius: 8px;

  .row {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: baseline;
    .container-icon {
      padding: 2px;
    }
    .icon-wrapper {
      width: 6px;
      height: 6px;
      margin-right: 8px;
    }
  }

  .margin-bottom {
    margin-bottom: 10px;
  }
`;

interface DescriptionBoxProps {
  symbol: string;
  token: SelectedPrivacy;
}

const DescriptionBox = ({ symbol, token }: DescriptionBoxProps) => {
  const genShieldingTime = () => {
    let shieldingTimeText = '';
    if (token.isBTC) {
      shieldingTimeText = '60 mins';
    }
    if (token?.isMainETH || token?.isErc20Token) {
      shieldingTimeText = '10 mins';
    }
    if (token?.isMainBSC || token?.isBep20Token) {
      shieldingTimeText = '5 mins';
    }
    if (token?.isMainMATIC || token?.isPolygonErc20Token) {
      shieldingTimeText = '9 mins';
    }
    if (token?.isMainFTM || token?.isFantomErc20Token) {
      shieldingTimeText = '3 mins';
    }
    // if (selectedPrivacy?.isAVAX || selectedPrivacy?.isAvaxErc20Token) {
    //   shieldingTimeText = '3 mins';
    // }
    //
    // if (selectedPrivacy?.isAURORA_ETH || selectedPrivacy?.isAuroraErc20Token) {
    //   shieldingTimeText = '3 mins';
    // }
    return shieldingTimeText;
  };

  const renderShieldingTime = () => {
    const time = genShieldingTime();
    if (!genShieldingTime()) return null;
    return (
      <div className="row margin-bottom">
        <div className="abc">
          <CircleIconSVG className="icon-wrapper" />
        </div>
        <ThemedText.SmallLabel fontWeight={400} color="primary5" style={{ flexWrap: 'wrap' }}>
          Your {symbol} shielding transaction is estimated to complete in {genShieldingTime()}.
        </ThemedText.SmallLabel>
      </div>
    );
  };
  return (
    <Styled>
      {renderShieldingTime()}
      <div className="row margin-top">
        <div className="abc">
          <CircleIconSVG className="icon-wrapper" />
        </div>
        <ThemedText.SmallLabel fontWeight={400} color="primary5" style={{ flexWrap: 'wrap' }}>
          {`Sending coins or tokens other than ${symbol} to this address may result in the loss of your funds.`}
        </ThemedText.SmallLabel>
      </div>
    </Styled>
  );
};

export default DescriptionBox;
