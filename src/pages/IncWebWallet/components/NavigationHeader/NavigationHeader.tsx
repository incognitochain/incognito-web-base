import BackIcon from 'assets/svg/ic-back.svg';
import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 60px;
  /* background-color: red; */
`;

const LeftViewContainer = styled.div`
  display: flex;
  flex: 1;

  .spaceView {
    width: 10px;
  }

  .leftTitleStyle {
    font-weight: 500;
    font-size: 20px;
    line-height: 160%;
    text-align: center;
  }
`;

const MiddleViewContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  .middleTitleStyle {
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    text-align: center;
  }
`;

const RightViewContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

type NavigationHeaderProps = {
  className?: string | undefined;
  containerStyle?: React.CSSProperties;

  //LeftView
  leftIcon?: React.ReactNode;
  leftTitle?: string;
  leftSubView?: React.ReactNode;
  onBack?: () => void;

  //MiddleView
  middleTitle?: string;

  //LeftView
  rightSubView?: React.ReactNode | React.ReactNode[];
};

const NavigationHeader = (props: NavigationHeaderProps) => {
  //LeftView Props
  const {
    leftIcon,
    leftTitle = '',
    leftSubView = undefined,
    onBack = () => {},
    containerStyle = {},
    className,
  } = props;

  //MiddleView Props
  const { middleTitle = '' } = props;

  //RightView Props
  const { rightSubView = undefined } = props;

  const renerLeftView = () => {
    return (
      <>
        <div
          className="row hover-opacity center"
          onClick={() => {
            if (onBack && typeof onBack === 'function') {
              onBack();
            }
          }}
        >
          {leftIcon ? leftIcon : <img alt="ic-arrow-left" src={BackIcon} />}
          <div className="spaceView"></div>
          <p className="leftTitleStyle">{leftTitle}</p>
        </div>
        {leftSubView}
      </>
    );
  };

  const renderMiddleView = () => {
    return (
      <>
        <p className="middleTitleStyle">{middleTitle}</p>
      </>
    );
  };

  const renderRightView = () => {
    const renderContent = () => {
      if (!rightSubView) return null;
      if (Array.isArray(rightSubView)) {
        return <>{rightSubView.map((e) => e)}</>;
      }
      return rightSubView;
    };
    return (
      <>
        <div className="row content">{renderContent()}</div>
      </>
    );
  };

  return (
    <Container>
      <LeftViewContainer>{renerLeftView()}</LeftViewContainer>
      {middleTitle && <MiddleViewContainer>{renderMiddleView()}</MiddleViewContainer>}
      {rightSubView && <RightViewContainer>{renderRightView()}</RightViewContainer>}
    </Container>
  );
};

export default NavigationHeader;
