import CopyIcon from 'components/Copy/index';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const Styled = styled.div`
  margin-top: 24px;
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
    margin-top: 4px;
    display: flex;
    flex: 1;
    padding: 16px;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border1};
    background-color: ${({ theme }) => theme.primary14};

    .paymentAddressText {
      flex: 1;
      margin-right: 20px;
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AddressBoxProps {
  paymentAddress?: string;
}

const AddressBox = ({ paymentAddress }: AddressBoxProps) => {
  return (
    <Styled>
      {paymentAddress && (
        <div>
          <ThemedText.SmallLabel fontWeight={400} color="#9C9C9C">
            Address
          </ThemedText.SmallLabel>
          <div className="paymentAddress-area">
            <div className="paymentAddressText">
              <ThemedText.RegularLabel fontWeight={500} color="primary5" style={{ lineBreak: 'anywhere' }}>
                {paymentAddress}
              </ThemedText.RegularLabel>
            </div>

            <CopyIcon text={paymentAddress} />
          </div>
        </div>
      )}
    </Styled>
  );
};

export default AddressBox;
