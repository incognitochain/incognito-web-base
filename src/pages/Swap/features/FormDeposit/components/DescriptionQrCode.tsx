import CopyIcon from 'components/Copy/index';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const Styled = styled.div`
  margin-top: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .paymentAddress-area {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DescriptionQrCodeProps {
  symbol: string;
  paymentAddress?: string;
}

const DescriptionQrCode = ({ symbol, paymentAddress }: DescriptionQrCodeProps) => {
  return (
    <Styled>
      <ThemedText.SmallLabel fontWeight={400} color="primary8">
        {`Send only ${symbol} to this shielding address`}
      </ThemedText.SmallLabel>
      {paymentAddress && (
        <div className="paymentAddress-area">
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            {paymentAddress}
          </ThemedText.SmallLabel>
          <CopyIcon text={paymentAddress} />
        </div>
      )}
    </Styled>
  );
};

export default DescriptionQrCode;
