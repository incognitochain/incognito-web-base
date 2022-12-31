import { ReactComponent as InternetDisconnectedImage } from 'assets/svg/disconnect-image.svg';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { useInternetConnnection } from '../../components/Core/InternetConnection';

export const Styled = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  align-items: center;
  flex: 1;
  z-index: 1;
  min-height: 96vh;

  .button {
    all: unset;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 12px 25px;
    gap: 8px;
    min-width: 120px;
    color: ${({ theme }) => theme.text1};

    background-color: ${({ theme }) => theme.primary2};
    border-radius: 8px;
    max-height: 40px;

    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .icon-wrapper {
    margin-bottom: 40px;
  }

  .description-wrapper {
    margin-top: 8px;
    margin-bottom: 40px;
  }
`;

const InternetDisconnected = () => {
  const isInternetAlready = useInternetConnnection();
  const history = useHistory();

  useEffect(() => {
    if (!isInternetAlready) {
      // history.replace('/internet-disconnected');
    } else {
      history.replace('/');
    }
  }, [isInternetAlready]);

  return (
    <Styled>
      <InternetDisconnectedImage className="icon-wrapper" />
      <ThemedText.LargeHeader color="primary5">{'No internet connection'}</ThemedText.LargeHeader>

      <ThemedText.RegularLabel fontWeight={400} color="primary8" className="description-wrapper">
        {'Please check your internet connection and try again'}
      </ThemedText.RegularLabel>

      <button
        className="button button-hover"
        onClick={() => {
          console.log('Try again TO DO');
        }}
      >
        Try again
      </button>
    </Styled>
  );
};

export default InternetDisconnected;
