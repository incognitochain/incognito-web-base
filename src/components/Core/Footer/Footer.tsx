import { Col, Row, Tooltip } from 'antd';
import { FOOTER_ID } from 'pages/App';
import { route as PolicyRoute } from 'pages/Policy/Policy.route';
import { route as TermRoute } from 'pages/TermOfService/TermOfService.route';
import React, { memo } from 'react';

import { Styled } from './Footer.styled';
import BookSVG from './images/book.svg';
import DiscordSVG from './images/discord.svg';
import ForumSVG from './images/forum.svg';
import RedditSVG from './images/reddit.svg';
import TelegramSVG from './images/telegram.svg';
import TwitterSVG from './images/twitter.svg';

const Footer = () => {
  const renderSocial1 = () => {
    // if (isMobile) {
    //   return (
    //     <Row className="wrap-social">
    //       <button
    //         className="normal-label button-text"
    //         onClick={() => {
    //           window.open('https://we.incognito.org', '_blank');
    //         }}
    //       >
    //         Forum
    //       </button>
    //       <button
    //         className="normal-label button-text"
    //         onClick={() => {
    //           window.open(
    //             'https://we.incognito.org/t/incognito-whitepaper-incognito-mode-for-cryptonetworks/168',
    //             '_blank'
    //           );
    //         }}
    //       >
    //         White paper
    //       </button>
    //       <button
    //         className="normal-label default-margin-left button-text"
    //         onClick={() => {
    //           window.open('https://t.me/incognitochain', '_blank');
    //         }}
    //       >
    //         Telegram
    //       </button>
    //       <button
    //         className="normal-label default-margin-left button-text"
    //         onClick={() => {
    //           window.open('https://twitter.com/IncognitoChain', '_blank');
    //         }}
    //       >
    //         Twitter
    //       </button>
    //       <button
    //         className="normal-label default-margin-left button-text"
    //         onClick={() => {
    //           window.open('https://discord.com/invite/Wh6xRFz72U', '_blank');
    //         }}
    //       >
    //         Discord
    //       </button>
    //     </Row>
    //   );
    // }
    return (
      <Row className="wrap-social">
        <Tooltip title="White paper">
          <img
            src={BookSVG}
            className="default-margin-left"
            alt="image"
            onClick={() => {
              window.open(
                'https://we.incognito.org/t/incognito-whitepaper-incognito-mode-for-cryptonetworks/168',
                '_blank'
              );
            }}
          />
        </Tooltip>
        <Tooltip title="Forum">
          <img
            src={ForumSVG}
            className="default-margin-left"
            alt="image"
            onClick={() => {
              window.open('https://we.incognito.org', '_blank');
            }}
          />
        </Tooltip>
        <Tooltip title="Telegram">
          <img
            src={TelegramSVG}
            className="default-margin-left"
            onClick={() => {
              window.open('https://t.me/incognitochain', '_blank');
            }}
            alt="image"
          />
        </Tooltip>
        <Tooltip title="Twitter">
          <img
            src={TwitterSVG}
            className="default-margin-left"
            onClick={() => {
              window.open('https://twitter.com/IncognitoChain', '_blank');
            }}
            alt="image"
          />
        </Tooltip>
        <Tooltip title="Discord">
          <img
            src={DiscordSVG}
            className="default-margin-left"
            onClick={() => {
              window.open('https://discord.com/invite/Wh6xRFz72U', '_blank');
            }}
            alt="image"
          />
        </Tooltip>
        <Tooltip title="Reddit">
          <img
            src={RedditSVG}
            className="default-margin-left"
            onClick={() => {
              window.open('https://www.reddit.com/r/IncognitoChain/', '_blank');
            }}
            alt="image"
          />
        </Tooltip>
      </Row>
    );
  };
  return (
    <Styled className="default-max-width" id={FOOTER_ID}>
      <Col className="wrap-branch">
        <p className="normal-label">© {new Date().getFullYear()} Incognito</p>
      </Col>
      <Row className={`wrap-term`}>
        <button
          className="normal-label button-text"
          onClick={() => {
            window.open(TermRoute);
          }}
        >
          Terms of Service
        </button>
        <button
          className="normal-label button-text default-margin-left"
          onClick={() => {
            window.open(PolicyRoute);
          }}
        >
          Privacy Policy
        </button>
      </Row>
      <Col>{renderSocial1()}</Col>
    </Styled>
  );
};

export default memo(Footer);
