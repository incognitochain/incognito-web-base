import styled from 'styled-components/macro';

export const Styled = styled.div``;

export const Header = styled.div`
  margin-top: -55px;
  height: 98px;
  background-color: ${({ theme }) => theme.bg3};
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.div<{ isSelected: boolean }>`
  margin-left: 40px;
  margin-right: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  :hover {
    opacity: 0.8;
  }
  p {
    margin-top: 8px;
    color: ${({ isSelected, theme }) => (isSelected ? theme.btn1 : '')};
  }
  svg {
    path {
      fill: ${({ isSelected, theme }) => (isSelected ? theme.btn1 : 'white')};
    }
  }
`;
