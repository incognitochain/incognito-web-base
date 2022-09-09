import CopyIcon from 'components/Copy/index';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
import { ellipsisCenter } from 'utils';

const Styled = styled.div`
  margin-top: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .paymentAddress-area {
    margin-top: 10px;
    display: flex;
    flex: 1;
    padding: 14px;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    height: 54px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border1};
    background-color: ${({ theme }) => theme.primary14};

    .paymentAddressText {
      width: 85%;
      margin-right: 20px;
    }
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
      <div className="center">
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {`Send only ${symbol} to this shielding address`}
        </ThemedText.SmallLabel>
      </div>

      {paymentAddress && (
        <div className="paymentAddress-area">
          <div className="paymentAddressText">
            <ThemedText.SmallLabel fontWeight={500} color="primary5">
              {ellipsisCenter({
                str: paymentAddress || '',
                limit: 18,
              })}
            </ThemedText.SmallLabel>
          </div>

          <CopyIcon text={paymentAddress} />
        </div>
      )}
    </Styled>
  );
};

export default DescriptionQrCode;
