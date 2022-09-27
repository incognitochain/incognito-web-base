import { ReactComponent as CircleIconSVG } from 'assets/svg/circle-icon.svg';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

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

  .margin-top {
    margin-top: 10px;
  }
`;

interface DescriptionBoxProps {
  symbol: string;
}

const DescriptionBox = ({ symbol }: DescriptionBoxProps) => {
  return (
    <Styled>
      <div className="row">
        <div className="abc">
          <CircleIconSVG className="icon-wrapper" />
        </div>
        <ThemedText.SmallLabel fontWeight={400} color="primary5" style={{ flexWrap: 'wrap' }}>
          Your {symbol} shielding transaction is estimated to complete in 10 mins.
        </ThemedText.SmallLabel>
      </div>
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
