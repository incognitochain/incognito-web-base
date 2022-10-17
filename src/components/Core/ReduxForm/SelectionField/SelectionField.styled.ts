import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';

export const Container = styled.div``;

export const Content = styled.div<{ isActive: boolean }>`
  border-radius: 12px;
  margin-top: 2px;
  padding: 8px;
  border: 1px solid ${({ theme, isActive }) => (isActive ? theme.blue1 : theme.border1)};
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
  padding-top: 3px;
  padding-bottom: 3px;
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

export const Input = styled.input<{ active: boolean; isError: boolean }>`
  font-size: 22px;
  font-weight: 600;
  outline: none;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 56px;
  color: ${({ theme }) => theme.primary5};
  text-align: right;
  max-width: 500px;
  margin-left: 40px;
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
