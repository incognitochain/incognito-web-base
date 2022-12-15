import styled from 'styled-components/macro';

export const Styled = styled.div``;

export const Header = styled.div`
  margin-top: -55px;
  min-height: 98px;
  background-color: ${({ theme }) => theme.bg3};
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0px;
  `}
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
    width: 40px;
    height: 40px;
    path {
      fill: ${({ isSelected, theme }) => (isSelected ? theme.btn1 : 'white')};
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    svg {
      width: 32px;
      height: 32px;
    }
  `}
`;
