import { memo } from 'react';
import styled from 'styled-components/macro';
import { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  margin-top: 140px;
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
  }

  .descripiton-container {
    margin-top: 30px;
    margin-bottom: 40px;
    ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
      margin-bottom: 25px;
    `}
  }

  .video-container {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
    border-radius: 16px;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    .video {
      /* width: 100%;
      height: 700px;
      max-height: 700px; */

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    margin-top: 80px;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    margin-top: 50px;
  `}
`;

const ValidatorTutorial = () => {
  return (
    <Styled>
      <div className="center">
        <h1>Tutorial</h1>
      </div>

      <div className="center">
        <p className="description2 descripiton-container color-white">Incognito Youtube chanel</p>
      </div>

      {/* The easiest way to get the correct link is to right-click on the YouTube video and select copy embed code. */}
      <div className="video-container">
        <iframe title="Incognito" className="video" src="https://www.youtube.com/embed/Vz7cm01SiEk" />
      </div>
    </Styled>
  );
};

export default memo(ValidatorTutorial);
