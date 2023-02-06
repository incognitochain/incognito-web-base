import styled from 'styled-components/macro';

const Container = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.bg3};
  width: 100vw;
  padding-top: 9px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;

  @keyframes MoveUp {
    0% {
      bottom: -100px;
    }
    50% {
      bottom: -50px;
    }
    80% {
      bottom: -20px;
    }
    100% {
      bottom: -2px;
    }
  }

  animation: MoveUp 250ms ease-in alternate;

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
  }

  .text-listed {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.color_grey};
  }

  .text-items {
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
  }

  .duration {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 16px;

    .duration-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: ${({ theme }) => theme.color_grey};
      margin-right: 16px;
    }
  }
`;

const ButtonList = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  padding-left: 24px;
  padding-right: 24px;
  height: 48px;
  .text {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
  }

  background-color: ${({ theme }) => theme.color_blue};
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.primary1};
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.mediaWidth.upToMedium}px`}) {
    margin-top: 20px;
  }
`;

const ButtonCancel = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  padding-left: 24px;
  padding-right: 24px;
  height: 48px;
  margin-left: 16px;
  .text {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: ${({ theme }) => theme.color_blue};
  }

  background-color: ${({ theme }) => theme.white};
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.primary11};
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.mediaWidth.upToMedium}px`}) {
    margin-top: 20px;
  }
`;

export { ButtonCancel, ButtonList, Container };
