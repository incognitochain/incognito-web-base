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
    margin-right: 20px;
    max-width: 470px;
    color: ${({ theme }) => theme.text1};
  }
  .col-1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .btn-get-prv {
    max-width: 180px;
    margin-top: 40px;
    max-height: 48px;
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
      .btn-get-prv {
        margin-top: 30px;
        max-width: 50%;
        margin-left: auto;
        margin-right: auto;
      }
      .sub-header {
        margin-right: 0;
        text-align: center;
        max-width: 70%;
        margin-left: auto;
        margin-right: auto;
      }
  `}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    .btn-get-prv {
      max-width: 100%;
    }
    .sub-header {
        max-width: 100%;
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
    max-width: 685px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    white-space: pre-wrap;
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-top: 50px;
  `}
`;

const WrapChart = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  .head-pie {
    font-weight: 700;
    font-size: 28px;
    line-height: 140%;
    text-align: center;
    margin-bottom: 40px;
  }
  .pie-img {
    max-width: 450px;
  }
  .head-reward {
    font-weight: 700;
    font-size: 28px;
    line-height: 140%;
    text-align: center;
    margin-bottom: 40px;
  }
  .reward-img {
    max-width: 670px;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    .head-reward {
      margin-top: 50px;
    }
    .reward-img {
      max-width: 630px;
    }
  `}
  ${({ theme }) => theme.mediaWidth.upToSmall`
    .reward-img {
      max-width: 98%;
    }
    .pie-img {
      max-width: 100%;
    }
  `}
`;

export { Container, Content, Header, WrapChart };
