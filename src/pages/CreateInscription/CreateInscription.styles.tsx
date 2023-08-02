import styled, { css } from 'styled-components/macro';
import { MediaQueryBuilder } from 'theme/mediaQuery';

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#2196f3';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

export const Container = styled.div`
  padding-bottom: 40px;
  width: 100%;
  min-height: calc(100vh - 155px);
  display: flex;
  flex-direction: column;

  .body-container {
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 1rem;
    width: 500px;
    min-height: 500px;
    background-color: lightgrey;
    box-shadow: 15px 15px 60px rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    margin: 10px auto;

    .title {
      font-weight: 500;
      font-size: 1.5rem;
      line-height: 1.2rem;
      color: black;
      text-align: center;
    }

    .description {
      display: flex;
      flex-direction: column;
      margin: 0px 40px;
      ul {
        list-style: initial;
        text-align: left;

        li {
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.4rem;
          color: black;
        }
      }

      span {
        font-weight: 600;
        color: orange;
      }
    }

    ${MediaQueryBuilder(
      'upToLarge',
      css`
        width: 95%;
      `
    )}
    ${MediaQueryBuilder(
      'upToMedium',
      css`
        width: 100%;
      `
    )}
  }
`;

export const UploadFileZone = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 0.5rem;
  margin: 0px 30px;
  background-color: #0dcaf022;
  border-width: 2px;
  border-radius: 12px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;

  :hover {
    cursor: pointer;
  }

  .upload-description {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
    color: black;
    text-align: center;
  }

  .upload-error {
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: red;
    text-align: center;
  }

  .content-file {
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: black;
    text-align: center;
  }

  .trash-icon {
    color: blue;
    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export const InscribeNowButton = styled.div`
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0px 30px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  color: red;
  text-align: left;
`;
