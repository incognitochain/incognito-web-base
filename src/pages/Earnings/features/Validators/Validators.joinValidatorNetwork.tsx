import validator from 'assets/images/validator.png';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  width: 100%;
  border-radius: 24px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.color_grey2};

  .leftView {
    display: flex;
    flex: 1;
    padding: 70px;
    justify-content: center;
    flex-direction: column;
    .descriptionContainer {
      margin-top: 40px;
    }
  }

  .rightView {
    flex: 1;
    padding: 20px;
    .img {
      width: 100%;
      max-width: 625.99px;
      max-height: 437px;
      height: auto;
      margin-left: auto;
      margin-right: auto;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
    flex-direction: row;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    flex-direction: row;
    .leftView {
      flex: 1.1;
      padding: 50px;
    }
    .rightView {
      flex: 0.9;
      padding: 0px;
      .img {
        margin: 30px 10px 30px 30px;
      }
    }
  `} 
  
  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
      .leftView {
        padding: 24px;
        .descriptionContainer {
          margin-top: 16px;
        }
      }
      .rightView {
        margin-left: 20px;
        margin-bottom: 20px;
        margin-top: 25px;
      }
  `}
`;

const ValidatorsJoinNetwork = () => {
  const history = useHistory();
  return (
    <Styled>
      <div className="leftView">
        <h1>Join the Validator Network</h1>
        <div className="descriptionContainer">
          <h6>
            Validators imply a group of nodes that perform consensus work, including verifying transactions, voting to
            add new blocks to the blockchain and earning block rewards.
          </h6>
        </div>
      </div>
      <div className="rightView center">
        <img className="img" src={validator} alt="phone-incognito-validator" />
      </div>
    </Styled>
  );
};

export default memo(ValidatorsJoinNetwork);
