import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  min-height: 50px;
  padding: 20px;
  border-radius: 8px;
  border-width: 1px;
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
