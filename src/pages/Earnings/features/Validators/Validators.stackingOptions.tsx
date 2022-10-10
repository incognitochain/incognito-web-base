import nodeImg from 'assets/images/node-img.png';
import vNodeScriptImg from 'assets/images/vnode-script.png';
import SectionHead from 'components/Core/SectionHead';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';
const Styled = styled.div`
  margin-top: 140px;
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
  }

  .sub-title-text {
    align-self: center;
    text-align: center;
    max-width: 520px;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.01em;
    white-space: initial;
  }

  .row {
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    .virualNodeView {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: flex-start;
      height: 400px;
      padding-top: 40px;
      padding-left: 40px;
      border-radius: 24px;
      background-color: #252525;

      .sub-title-text {
        align-self: start;
      }

      .vNodeScriptImgContainer {
        margin-top: 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .image-container {
          width: 100%;
          height: auto;
        }
      }

      ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
      `}
    }
    .space {
      width: 40px;
    }

    .physicalNodeView {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: row;
      height: 400px;
      max-height: 420px;
      border-radius: 24px;
      background-color: #252525;

      .left {
        flex: 1;
        display: flex;
        padding-top: 40px;
        padding-left: 40px;
        flex-direction: column;
        .title {
          text-align: left;
        }
        .sub-title-text {
          align-self: start;
          text-align: left;
        }

        .wrapper-section-head {
          margin-top: 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
      }

      .right {
        display: flex;
        position: relative;
        max-width: 260px;
        height: 100%;
        .image-container1 {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
    }

    .title {
      font-weight: 500;
      font-size: 40px;
      line-height: 54px;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
      .row {
        flex-direction: column;
        .space {
          height: 40px;
        }
      }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
      .row {
        flex-direction: column;
        .space {
          height: 40px;
        }
      }
  `}
`;

const ValidatorStackingOptions = () => {
  const history = useHistory();
  return (
    <Styled>
      <p className="title fw-medium main-title-text">Staking Options</p>
      <p className="text2 sub-title sub-title-text">
        There are 2 options to become a validator of Incognito network: Virtual Node (vNode) and Physical Node (pNode).
        Each option requires a stake of 1,750 PRV.{' '}
      </p>
      <div className="row">
        <div className="virualNodeView">
          <p className="title fw-medium main-title-text">Virtual Node</p>
          <p className="sub-title-text">Setup your node in only 1 line of code.</p>
          <div className="vNodeScriptImgContainer">
            <img className="image-container" src={vNodeScriptImg} alt="vnode-script" />
          </div>
        </div>
        <div className="space"></div>
        <div className="physicalNodeView">
          <div className="left">
            <p className="title fw-medium main-title-text">Physical Node</p>
            <p className="sub-title-text">A plug and play hardware device for ease of use.</p>
            <div className="wrapper-section-head">
              <SectionHead title="coming soon" />
            </div>
          </div>
          <div className="right">
            <img className="image-container1" src={nodeImg} alt="node" />
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default memo(ValidatorStackingOptions);
