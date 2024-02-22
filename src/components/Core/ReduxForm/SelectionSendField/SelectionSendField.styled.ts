import styled from 'styled-components/macro';

export const Container = styled.div`
  .selectable-error {
    display: flex;
    margin-left: 4px;
    text-decoration: underline;
    color: ${({ theme }) => theme.content4};
    cursor: pointer;
  }
`;

export const Content = styled.div<{ isActive: boolean }>`
  border-radius: 12px;
  margin-top: 2px;
  padding: 0 10px 0 10px;
  border: 1px solid ${({ theme, isActive }) => (isActive ? theme.blue1 : theme.primary14)};
  background-color: ${({ theme }) => theme.primary14};
  .default-padding {
    padding: 4px;
  }
  .hover-item {
    :hover {
      background-color: ${({ theme }) => theme.bg4};
      transition: 0.2s all ease-in-out;
    }
    :active {
      background-color: ${({ theme }) => theme.primary14};
      transition-duration: 0.1s;
    }
  }

  .max-text {
    padding-left: 15px;
    font-size: 18px;
    :hover {
      opacity: 0.8;
    }
    color: ${({ theme }) => theme.btn1};
  }
`;

export const Input = styled.input<{ active: boolean; isError: boolean }>`
  font-size: 22px;
  font-weight: 600;
  outline: none;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 56px;
  margin-right: 10px;
  color: ${({ theme }) => theme.primary5};
  border-radius: 8px;
  :hover {
  }

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
