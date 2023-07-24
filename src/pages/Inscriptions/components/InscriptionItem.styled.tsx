import styled from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  width: 100%;

  border-radius: 20px;
  overflow: hidden;
  background-color: red;

  :hover {
    cursor: pointer;
    transform: scale(1.01);
    transition-duration: 0.2s;
  }

  :hover .card-image {
    background: black;
  }

  :hover .view-icon {
    display: block;
  }

  .card-image {
    background: lightsalmon;
    padding-top: 100%;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }

  .card-info {
    margin-top: 20px;
    padding: 1rem 0px;
    display: flex;
    align-items: center;
    min-height: 50px;
    background-color: black;
  }

  .view-icon {
    z-index: 1;
    display: none;
  }
`;

export const CardImage = styled.div``;

export const CardInfo = styled.div`
  padding: 1rem 0px;
  display: flex;
  align-items: center;
  min-height: 80px;
  background-color: blue;
`;
