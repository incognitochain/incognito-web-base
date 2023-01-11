import styled from 'styled-components/macro';

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.bg3};
  width: 100vw;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .form {
    justify-content: flex-start;
    width: 100%;
  }
  .note {
    margin-top: 8px;
  }
  .select-tokens-list {
    height: 56px;
    background: #252525;
    width: 100px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding-left: 28px;
    padding-right: 28px;
    margin-left: 16px;
    margin-top: 2px;

    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.border1};

    :hover {
      border: 1px solid ${({ theme }) => theme.border5};
    }

    :focus {
      border: 1px solid ${({ theme }) => theme.border5};
      color: ${({ theme }) => theme.primary5};
    }
  }
  .selected-token-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

export { Container };
