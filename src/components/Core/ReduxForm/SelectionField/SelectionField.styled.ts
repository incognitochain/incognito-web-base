import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';

export const Container = styled.div``;

export const Content = styled.div`
  border-radius: 12px;
  margin-top: 6px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.border1};
  background-color: ${({ theme }) => theme.primary14};
  .default-padding {
    padding: 8px;
  }
  .hover-item {
    :hover {
      background-color: ${({ theme }) => theme.bg4};
      border-radius: 8px;
      padding-left: 10px;
      padding-right: 10px;
      transition: 0.2s all ease-in-out;
    }
    :active {
      background-color: ${({ theme }) => theme.primary14};
      transition-duration: 0.1s;
    }
  }
`;

export const ArrowDown = styled(ChevronDown)<{ open?: boolean }>`
  color: ${({ theme }) => theme.primary5};
  margin-left: 4px;
`;

export const WrapToken = styled.div`
  cursor: pointer;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const WrapNetwork = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'unset')};
  padding-top: 4px;
  padding-bottom: 4px;
  svg {
    color: ${({ theme }) => theme.primary8};
  }
  :hover {
    opacity: ${({ isActive }) => (isActive ? 0.8 : 1)};
    padding-left: 8px;
    border-radius: 8px;
    background-color: ${({ isActive, theme }) => (isActive ? theme.bg4 : 'transparent')};
    transition: 0.3s all ease-in-out;
    div {
      color: ${({ theme, isActive }) => (isActive ? theme.primary5 : theme.primary8)};
    }
    svg {
      color: ${({ theme }) => theme.primary5};
    }
  }
`;
