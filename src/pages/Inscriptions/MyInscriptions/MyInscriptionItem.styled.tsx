import styled from 'styled-components/macro';

export const Container = styled.div`
  flex: 1;
  width: 100%;
  border-radius: 20px;
  height: auto;

  :hover {
    cursor: pointer;
    transition-duration: 0.2s;
  }

  /* :hover .view-icon {
    display: block;
  } */

  .card-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-height: 40px;

    .title {
      font-weight: 500;
      font-size: 15px;
      line-height: 140%;
      color: white;
      text-align: left;
    }

    .token-id {
      font-weight: 500;
      font-size: 15px;
      line-height: 140%;
      color: white;
      text-align: right;
    }
  }
`;
