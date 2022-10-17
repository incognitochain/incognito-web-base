import styled from 'styled-components/macro';

import { RowBetween } from '../../Row';

export const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  z-index: 1;
  width: 100%;
  .wrap-input-header {
    margin-bottom: 4px;
    justify-content: space-between;
  }
  .input-container {
  }
`;

export const InputContainer = styled(RowBetween)`
  background-color: ${({ theme }) => theme.primary14};
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 16px;
  height: 56px;
`;

export const Input = styled.input`
  font-size: 16px;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  min-height: 56px;
  color: ${({ theme }) => theme.primary5};
  background-color: transparent;
  ::placeholder {
    color: ${({ theme }) => theme.primary7};
  }
  padding: 0;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const Styled = styled.div`
  margin-bottom: 16px;

  .input-wrapper {
    position: relative;
    flex: 1;
    > p {
      margin-top: 10px;
    }
  }
  .wrap-input-header {
    margin-bottom: 8px;
    justify-content: space-between;
    p {
    }
  }
  .align-right {
    text-align: right;
  }
  .input-container {
    position: relative;
    height: 54px;
    display: flex;
    flex: 1;
  }
  .sub-title {
    width: 60px;
  }
  > p {
    margin-top: 10px;
  }
  p.error {
  }
  p.warning {
  }
  .textarea-container {
    min-height: 76px;
    position: relative;
  }
  .input-container > input,
  .textarea-container > textarea {
    //position: absolute;
    //left: 0;
    //top: 0;
    width: 100%;
    height: 100%;
    max-height: 32px;
    :focus {
    }
    :hover {
    }
  }
  .textarea-container > textarea {
    padding: 10px;
    resize: none;
  }
  .input-container > input:read-only {
  }
  .input-wrap-suffix {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    flex: 1;
    border-radius: 8px;
    padding: 0 10px;
  }
  .input-wrap-suffix > input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 0 10px;
  }
  .input-wrap-suffix > p {
    margin-left: 3px;
  }
  .input-container .sub-icon {
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
  }

  .input-amount {
    > input {
      padding-right: 70px;
    }
    .sub-icon {
      right: 0;
    }
  }

  .align-right {
    > input {
      text-align: right;
      padding-right: 0px;
    }
    .sub-icon {
      right: 10px;
    }
  }

  .input-address {
    > input {
      padding-right: 70px;
    }
    .sub-icon {
      :nth-child(2) {
        right: 40px;
      }
      :last-child {
        right: 10px;
      }
    }
  }
  .wrapper {
    margin-top: 15px;
  }
  .wrap-content {
    height: 40px;
    width: 230px;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 8px;
    padding: 0 10px;
  }
  .wrap-content > p {
    padding-right: 5px;
  }
  .suffix {
    padding-left: 5px;
    display: contents;
  }

  .input-password {
    > input {
      padding-right: 40px;
    }
    > .sub-icon:last-child {
      right: 10px;
    }
  }
`;
