import Circle from 'assets/images/blue-loader.svg';
import { AutoColumn, ColumnCenter } from 'components/Core/Column';
import { Text } from 'rebass';
import styled from 'styled-components/macro';
import { CustomLightSpinner } from 'theme';

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;

const ConfirmedIcon = styled(ColumnCenter)<{ inline?: boolean }>`
  padding: ${({ inline }) => (inline ? '20px 0' : '32px 0;')};
`;

export default function Loading({
  content,
  inline,
}: {
  content?: string;
  inline?: boolean; // not in modal
}) {
  return (
    <Wrapper>
      <AutoColumn gap="md">
        <ConfirmedIcon inline={inline}>
          <CustomLightSpinner src={Circle} alt="loader" size={inline ? '40px' : '90px'} />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify={'center'}>
          <Text className="text1" fontWeight={400} fontSize={16} textAlign="center">
            {content}
          </Text>
        </AutoColumn>
      </AutoColumn>
    </Wrapper>
  );
}
