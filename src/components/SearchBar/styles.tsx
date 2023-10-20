import styled from 'styled-components/macro';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 0.5rem;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  min-height: 50px;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.bg3};
  caret-color: ${({ theme }) => theme.primary5};

  gap: 1rem;

  :hover {
    border: 1px solid ${({ theme }) => theme.color_blue};
  }

  :focus {
    border: 1px solid ${({ theme }) => theme.border5};
    color: ${({ theme }) => theme.primary5};
  }

  .search-ic {
    width: 16px;
    height: 16px;
    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export const TextInputStyled = styled.input`
  display: flex;
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: white;

  ::placeholder {
    flex: none;
    order: 0;
    flex-grow: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme.primary7};
  }
`;

export const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1rem;
  color: red;
`;
