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

export const LeftContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border1};
  cursor: pointer;

  :hover {
    border: 1px solid ${({ theme }) => theme.white};
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  min-height: calc(100vh - 155px);
  display: flex;
  flex-direction: column;

  .body-container {
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 500px;
    min-height: 550px;
    background-color: lightgrey;
    box-shadow: 15px 15px 60px rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    margin: 10px auto;

    .title {
      margin: 20px 0;
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
        color: blue;
      }
    }

    ${MediaQueryBuilder(
      'upToLarge',
      css`
        width: 40%;
        padding: 10px;
      `
    )}
    ${MediaQueryBuilder(
      'upToMedium',
      css`
        width: 50%;
        padding: 10px 0;
      `
    )}
  }

  ${MediaQueryBuilder(
    'upToLarge',
    css`
      width: 100%;
    `
  )}
  ${MediaQueryBuilder(
    'upToMedium',
    css`
      width: 100%;
    `
  )}
`;

export const UploadFileZone = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 0.5rem;
  margin: 10px 30px;
  min-height: 200px;
  margin-bottom: 20px;
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
    padding: 0 20px;
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
  margin-top: 20px;
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

// export const InscribeNowButton = withWalletConnected(InscribeNowButton1);

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0px 30px;

  .label {
    flex: 2;
    font-weight: 400;
    font-size: 15px;
    color: black;
  }

  .content {
    flex: 1;
    text-align: right;
    font-weight: 500;
    font-size: 16px;
    color: black;
  }

  .blue {
    color: blue;
  }

  .bold {
    font-weight: 500;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ErrorMessage = styled.p`
  margin: 10px 30px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  color: red;
  text-align: left;

  span {
    text-decoration: solid underline;
    text-underline-offset: 2px;
    :hover {
      cursor: pointer;
    }
  }
`;
