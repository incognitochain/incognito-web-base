import { RightColumn } from 'pages/Swap/Swap.styled';
import styled from 'styled-components/macro';

const Container = styled.div`
  padding-bottom: 80px;
  min-height: calc(100vh - 55px);
  width: 100%;
`;

const Content = styled(RightColumn)`
  margin-left: auto;
  margin-right: auto;
`;

export { Container, Content };
