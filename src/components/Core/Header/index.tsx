import useScrollPosition from '@react-hook/window-scroll';
import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import { useInternetConnnection } from 'components/Core/InternetConnection';
import Web3Status from 'components/Core/Web3Status';
import { INCOGNITO_LANDING_PAGE } from 'constants/routing';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useTheme from 'hooks/useTheme';
import { useDarkModeManager } from 'state/user/hooks';
import styled from 'styled-components/macro';
import { isMobile } from 'utils/userAgent';

import IncognitoWallet from '../IncognitoWallet';
import NetworkSelector from './NetworkSelector';
const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 142px 120px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  z-index: 21;
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  background-blend-mode: hard-light;
  min-height: 72px;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  background-color: ${({ theme }) => theme.bg2}; ;
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.5em;
  }

  /* addresses safaris lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  height: 40px;
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;

const IncognitoIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-1deg);
  }

  position: relative;
`;

export default function Header() {
  const { account } = useActiveWeb3React();
  const [darkMode] = useDarkModeManager();
  const { white, black } = useTheme();
  const isInternetAlready = useInternetConnnection();
  const scrollY = useScrollPosition();

  const renderContent = () => {
    const hrefLink = !isInternetAlready || !isMobile ? '.' : INCOGNITO_LANDING_PAGE;
    return (
      <>
        <Title href={hrefLink}>
          <IncognitoIcon>
            <Logo fill={darkMode ? white : black} width="142" height="100%" title="logo" />
          </IncognitoIcon>
        </Title>
        {isMobile || !isInternetAlready ? null : (
          <HeaderControls>
            <HeaderElement>
              <NetworkSelector />
            </HeaderElement>
            <HeaderElement>
              <AccountElement active={!!account}>
                <Web3Status />
              </AccountElement>
            </HeaderElement>
            {/*<HeaderElement>*/}
            {/*  <Menu />*/}
            {/*</HeaderElement>*/}

            <HeaderElement>
              <IncognitoWallet />
            </HeaderElement>
          </HeaderControls>
        )}
      </>
    );
  };

  return <HeaderFrame showBackground={scrollY > 45}>{renderContent()}</HeaderFrame>;
}
