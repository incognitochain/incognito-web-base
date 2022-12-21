import styled from 'styled-components/macro';

const Container = styled.div<{ height: number }>`
  padding-bottom: 80px;
  min-height: ${({ height }) => height}px;
  width: 100%;
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 16px;
  padding: 46px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 100px;
  .sub-header {
    margin-top: 16px;
    flex: 1;
    margin-right: 20px;
  }
  svg {
    min-width: 265px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
      margin-left: 12px;
      margin-right: 12px;
      grid-template-columns: auto;
      padding: 26px;
      gap: 20px;
      svg {
        max-width: 200px;
        min-width: 200px;
        margin-left: auto;
        margin-right: auto;
      }
      > svg {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }
      > .col-1 {
        grid-column: 1;
        grid-row: 2 / 3;
      }
      h3 {
        text-align: center;
      }
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
  .h7 {
    max-width: 638px;
    margin-left: auto;
    margin-right: auto;
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-top: 50px;
  `}
`;

export { Container, Content, Header };
