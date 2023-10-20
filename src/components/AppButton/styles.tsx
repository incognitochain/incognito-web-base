import styled from 'styled-components/macro';

export const Container = styled.div`
  padding: 10px 20px;
  display: inline-block;
  position: relative;
  align-items: center;
  background-color: ${({ theme }) => theme.primary2};
  border-radius: 8px;
  align-self: center;

  :hover {
    cursor: pointer;
    opacity: 0.8;
    scale: 1.02;
  }

  .text {
    align-self: center;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.75rem;
    width: max-content;
    white-space: nowrap;
    color: ${({ theme }) => theme.primary5};
  }
`;
