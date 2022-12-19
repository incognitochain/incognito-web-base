import styled from 'styled-components/macro';

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 16px;
  padding: 56px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 120px;
  .sub-header {
    margin-top: 16px;
    flex: 1;
    margin-right: 20px;
  }
  svg {
    min-width: 265px;
    height: auto;
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
      margin-left: 12px;
      margin-right: 12px;
  `}
`;

const Content = styled.div`
  margin-top: 100px;
  h3 {
    text-align: center;
  }
  p {
    margin-top: 16px;
    text-align: center;
    color: ${({ theme }) => theme.color_white};
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-top: 50px;
  `}
`;

export { Container, Content, Header };
