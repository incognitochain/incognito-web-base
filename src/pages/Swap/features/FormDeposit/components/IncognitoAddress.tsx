import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

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
    flex: 1;
    padding: 14px;
    height: 54px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border1};
    background-color: ${({ theme }) => theme.primary14};

    .paymentAddressText {
      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 16px; /* fallback */
      max-height: 32px; /* fallback */
      -webkit-line-clamp: 1; /* number of lines to show */
      -webkit-box-orient: vertical;
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IncognitoAddressProps {
  paymentAddress?: string;
}

const IncognitoAddress = ({ paymentAddress }: IncognitoAddressProps) => {
  return (
    <Styled>
      <div>
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          Incognito address
        </ThemedText.SmallLabel>
      </div>

      {paymentAddress && (
        <div className="paymentAddress-area">
          <ThemedText.SmallLabel fontWeight={500} className="paymentAddressText" color="primary5">
            {paymentAddress}
          </ThemedText.SmallLabel>
        </div>
      )}
    </Styled>
  );
};

export default IncognitoAddress;
