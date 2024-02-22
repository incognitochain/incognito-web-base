import styled from 'styled-components/macro';

export const Space = styled.div`
  width: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.p`
  flex: 1;
  font-size: 14px;
  width: max-content;
  white-space: nowrap;
  font-weight: 500;
  line-height: 140%;
  text-align: center;
`;

export const Wrapper = styled.div<{ isConnected: boolean }>`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  gap: 8px;
  text-align: center;
  /* background-color: ${({ theme }) => theme.primary2}; */
  background-color: ${({ theme, isConnected }) => (isConnected ? theme.bg1 : theme.primary2)};
  color: ${({ theme, isConnected }) => (isConnected ? theme.primary5 : theme.primary5)};
  border-radius: 8px;
  height: 40px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    background-color: ${({ theme, isConnected }) => (isConnected ? theme.bg1 : theme.primary1)};
  }
`;

export const WalletButton = styled.div<{ isImport: boolean }>`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  gap: 8px;
  text-align: center;
  background-color: ${({ theme, isImport }) => (isImport ? theme.white : theme.primary2)};
  border-radius: 8px;
  height: 40px;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    background-color: ${({ theme, isImport }) => (isImport ? theme.primary11 : theme.primary1)};
  }

  .text {
    font-size: 14px;
    width: max-content;
    white-space: nowrap;
    font-weight: 500;
    line-height: 140%;
    text-align: center;
    color: ${({ theme, isImport }) => (isImport ? theme.primary2 : theme.primary5)};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
`;
