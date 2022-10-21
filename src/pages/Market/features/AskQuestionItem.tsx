import React from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

const MenuItemStyled = styled.div`
  display: flex;
  flex-direction: column;

  .topView {
    flex: 1;
    padding: 20px 0px;
    display: flex;
    align-items: center;
    flex-direction: row;

    .title-container {
      margin: 0px;
      flex: 1;
      margin-right: 30px;
    }

    .icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      .arrow {
        border: solid #757575;
        border-width: 0 2.5px 2.5px 0;
        display: inline-block;
        padding: 2.5px;
      }
      .up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
      }
      .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
  }

  .childrenView {
    margin-bottom: 20px;
    * {
      animation: fadeIn 0.6s;
      -webkit-animation: fadeIn 0.6s;
      -moz-animation: fadeIn 0.6s;
      -o-animation: fadeIn 0.6s;
      -ms-animation: fadeIn 0.6s;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-moz-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-o-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-ms-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  .lineBreak {
    flex: 1;
    height: 0.8px;
    border: 0.8px solid ${({ theme }: { theme: DefaultTheme }) => theme.color_grey3};
  }
`;

interface AskQuestionItemProps {
  isActive?: boolean;
  title?: string;
  subItem?: React.ReactNode;
  itemOnClick: (key: string) => void;
}
const AskQuestionItem = (props: AskQuestionItemProps) => {
  const { title = '', subItem = true, isActive = false, itemOnClick = () => {} } = props;

  return (
    <MenuItemStyled>
      <div
        className="topView hover-opacity"
        onClick={() => {
          itemOnClick(title);
        }}
      >
        <div className="title-container">
          <h5 className={isActive ? 'color_blue' : undefined}>{title}</h5>
        </div>
        <div className="icon">
          <i className={`arrow ${isActive ? 'up' : 'down'}`} />
        </div>
      </div>

      {isActive && <div className="childrenView">{subItem}</div>}
      <div className="lineBreak"></div>
    </MenuItemStyled>
  );
};

export default AskQuestionItem;
