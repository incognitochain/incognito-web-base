import styled from 'styled-components/macro';

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.bg3};
  width: 100vw;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
  .current-error {
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    color: ${({ theme }) => theme.content4};
    margin-top: 4px;
    text-align: end;
  }

  .form {
    justify-content: flex-start;
    width: 100%;
  }
  .note {
    margin-top: 8px;
    font-size: 12px;
    line-height: 120%;
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
    height: 56px;
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
`;

const SelectionToken = styled.div<{ hidden: boolean }>`
  height: 56px;
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
  height: 56px;
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
