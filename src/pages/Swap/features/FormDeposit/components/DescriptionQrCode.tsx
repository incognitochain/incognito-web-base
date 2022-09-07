import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const Styled = styled.div`
  margin-top: 16px;
  flex: 1;
  display: flex;
  justify-content: center;
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DescriptionQrCodeProps {}

const DescriptionQrCode = (props: DescriptionQrCodeProps) => {
  return (
    <Styled>
      <ThemedText.SmallLabel fontWeight={400} color="primary8">
        {'Send only ETH to this shielding address'}
      </ThemedText.SmallLabel>
    </Styled>
  );
};

export default DescriptionQrCode;
