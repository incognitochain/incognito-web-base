import Circle from 'assets/images/blue-loader.svg';
import { AutoColumn, ColumnCenter } from 'components/Core/Column';
import useWalletController from 'pages/IncWebWallet/hooks/useWalletController';
import { Text } from 'rebass';
import styled from 'styled-components/macro';
import { CustomLightSpinner } from 'theme';
const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;
const Section = styled(AutoColumn)<{ inline?: boolean }>`
  padding: ${({ inline }) => (inline ? '0' : '0')};
`;

const ConfirmedIcon = styled(ColumnCenter)<{ inline?: boolean }>`
  padding: ${({ inline }) => (inline ? '20px 0' : '32px 0;')};
`;

export default function LoadingTransaction({
  pendingText,
  inline,
}: {
  pendingText: string;
  inline?: boolean; // not in modal
}) {
  const walletController = useWalletController();

  const messageDefault = walletController.isWalletWeb
    ? 'Please wait a few minutes'
    : 'Confirm this transaction in your wallet';
  return (
    <Wrapper>
      <AutoColumn gap="md">
        <ConfirmedIcon inline={inline}>
          <CustomLightSpinner src={Circle} alt="loader" size={inline ? '40px' : '90px'} />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify={'center'}>
          <Text className="text1" fontWeight={400} fontSize={16} textAlign="center">
            {pendingText}
          </Text>
          <Text fontWeight={500} fontSize={14} color="#565A69" textAlign="center" marginBottom="12px">
            {messageDefault}
          </Text>
        </AutoColumn>
      </AutoColumn>
    </Wrapper>
  );
}
