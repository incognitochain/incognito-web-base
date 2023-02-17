import IcArrowLeft from 'pages/IncWebWallet/images/ic_arrow_left.svg';
// import IcExit from 'pages/Wallet/images/ic_exit.svg';
import React from 'react';

import { CenterContainer, Container, LeftContainer } from './Header.styled';

interface HeaderProps {
  onClickGoBack: () => void;
  centerComponent?: () => React.ReactElement;
}

const Header = (props: HeaderProps) => {
  return (
    <Container>
      <LeftContainer onClick={props.onClickGoBack}>
        <img alt="ic-arrow-left" src={IcArrowLeft} />
      </LeftContainer>
      <CenterContainer>{props.centerComponent && props.centerComponent()}</CenterContainer>
      <LeftContainer style={{ border: 'none' }}>{/* <img alt="ic-exit" src={IcExit} /> */}</LeftContainer>
    </Container>
  );
};

export default React.memo(Header);
