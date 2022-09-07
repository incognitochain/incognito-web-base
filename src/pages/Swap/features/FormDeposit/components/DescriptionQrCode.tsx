import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const Styled = styled.div`
  margin-top: 16px;
  flex: 1;
  display: flex;
  justify-content: center;
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DescriptionQrCodeProps {
  symbol: string;
}

const DescriptionQrCode = ({ symbol }: DescriptionQrCodeProps) => {
  return (
    <Styled>
      <ThemedText.SmallLabel fontWeight={400} color="primary8">
        {`Send only ${symbol} to this shielding address`}
      </ThemedText.SmallLabel>
    </Styled>
  );
};

export default DescriptionQrCode;
