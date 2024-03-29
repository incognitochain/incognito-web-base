import { ReactComponent as MobileNotSupportedSVG } from 'assets/svg/mobile-not-supported.svg';
import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
import { isIOS } from 'utils/userAgent';

export const Styled = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 1rem;
  align-items: center;
  justify-content: center;
  .body-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .button {
    all: unset;
    position: fixed;
    align-items: center;
    justify-content: center;
    gap: 8px;

    background-color: ${({ theme }) => theme.primary2};
    border-radius: 8px;
    height: 50px;

    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    flex: none;
    order: 0;
    flex-grow: 0;
    left: 15px;
    right: 15px;

    bottom: 15px;
  }

  .icon-wrapper {
    margin-bottom: 40px;
  }

  .description-wrapper {
    margin-top: 12px;
  }
`;

const MobileNotSuported = () => {
  return (
    <Styled>
      <div className="body-wrapper">
        <MobileNotSupportedSVG className="icon-wrapper" />
        <ThemedText.LargeHeader color="primary5">{'Not supported'}</ThemedText.LargeHeader>

        <ThemedText.RegularLabel fontWeight={400} color="primary8" className="description-wrapper">
          {'The function is not supported on mobile.'}
        </ThemedText.RegularLabel>
      </div>

      <button
        className="button button-hover"
        onClick={() => {
          const URL = isIOS()
            ? 'https://apps.apple.com/us/app/incognito-crypto-wallet/id1475631606?ls=1'
            : 'https://play.google.com/store/apps/details?id=com.incognito.wallet';
          window.open(URL);
        }}
      >
        {'Download app'}
      </button>
    </Styled>
  );
};

export default MobileNotSuported;
