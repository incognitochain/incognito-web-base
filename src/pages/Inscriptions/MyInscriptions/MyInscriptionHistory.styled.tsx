import styled from 'styled-components/macro';

export const Container = styled.div`
  flex: 1;
  /* background-color: lightgray; */
  height: auto;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  width: 100%;
  gap: 1rem;
  /* align-items: center;
  justify-content: center;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.color_grey2}; */

  .emptyList {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    .emptyText {
      font-weight: 500;
      font-size: 20px;
      line-height: 140%;
      color: white;
      text-align: center;
    }
  }
`;
