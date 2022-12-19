import styled from 'styled-components/macro';

export const Styled = styled.div``;

export const Header = styled.div`
  margin-top: -55px;
  min-height: 98px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg3};
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0px;
    border-radius: 8px;
  `}
`;

export const Icon = styled.div<{ isSelected: boolean }>`
  margin-left: 40px;
  margin-right: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  :hover {
    opacity: 0.8;
  }
  p {
    margin-top: 8px;
    font-size: 14px;
    color: ${({ isSelected, theme }) => (isSelected ? theme.color_grey : 'white')};
  }
  svg {
    width: 40px;
    height: 40px;
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
