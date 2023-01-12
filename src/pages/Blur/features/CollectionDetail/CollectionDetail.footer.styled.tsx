import styled from 'styled-components/macro';

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.bg3};
  width: 100vw;
  padding: 9px;
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
      bottom: 0;
    }
  }

  animation: MoveUp 250ms ease-in alternate;

  .current-error {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.content4};
    margin-top: 4px;
    text-align: end;
  }

  .form {
  }
  .note {
    margin-top: 4px;
    font-size: 12px;
    line-height: 120%;
    color: ${({ theme }) => theme.color_grey};
  }
  .address-group {
    width: 45%;
  }
  .default-max-width {
    width: 100%;
  }
  .spacing {
    flex: 1;
    min-width: 24px;
  }
  .wrap-balance {
    margin-left: 32px;
    justify-content: space-between;
    height: 48px;
    display: flex;
    flex-direction: column;
    .header {
      color: ${({ theme }) => theme.color_grey};
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
    }
    .amount {
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
    }
  }

  .input-container {
    height: 48px;
  }
`;

const SelectionToken = styled.div<{ hidden: boolean }>`
  height: 48px;
  display: flex;
  width: fit-content;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color_grey2};
  border: 1px solid ${({ theme }) => theme.color_grey2};
  padding: 0 16px;
  margin: 4px 0 0 16px;
  cursor: pointer;
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
  :hover {
    border: 1px solid ${({ theme }) => theme.border5};
  }
  .token-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const ButtonBuy = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  padding-left: 24px;
  padding-right: 24px;
  height: 48px;
  .text-buy {
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
`;

export { ButtonBuy, Container, SelectionToken };
