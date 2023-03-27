import withBlur from 'pages/IncWebWallet/hoc/withBlur';
import styled from 'styled-components/macro';
const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  min-height: 600px;
  text-align: center;
`;

const Box = styled.div`
  padding: 32px;
  box-shadow: 0px 4px 12px ${({ theme }) => theme.bg4};
  margin-top: 32px;
  border-radius: 8px;
`;

const PhraseText = styled.p`
  color: ${({ theme }) => theme.white};
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

export const parseShard = (bytes: any) => {
  const arr = bytes.split(',');
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

interface ModalPhraseProps {
  data?: any;
}

export const ModalPhrase = (props: ModalPhraseProps) => {
  const { data } = props;
  const words = data?.mnemonic;
  return (
    <>
      <ModalContainer>
        <h5>Reveal Seed Words</h5>
        <Box>
          <PhraseText>{words}</PhraseText>
        </Box>
      </ModalContainer>
    </>
  );
};

export default withBlur(ModalPhrase);
