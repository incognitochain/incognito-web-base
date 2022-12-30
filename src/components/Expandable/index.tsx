import ArrowDownSVG from 'assets/images/arrow-down-white.svg';
import React from 'react';
import styled from 'styled-components/macro';

const Styled = styled.div<{ isExpand?: boolean }>`
  border: 1px solid ${({ theme }) => theme.border1};
  border-radius: 12px;
  padding: 24px;
  margin-top: 16px;
  cursor: pointer;

  .container-expand {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .content-expand {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .left-icon {
    width: 16px;
    height: 16px;
  }

  .title {
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
    margin-left: 24px;
  }

  .arrow {
    align-self: center;
    width: 16px;
    height: 16px;
    transform: rotate(${({ isExpand }) => (isExpand ? 180 : 0)}deg);
  }
`;

interface ExpandableProps {
  icon: any;
  title: string;
  child: React.ReactElement;
  expand?: boolean;
}

export default function Expandable(props: ExpandableProps) {
  const { icon, title, child, expand } = props;

  const [isExpand, setIsExpand] = React.useState(expand);

  const onClickExpand = () => {
    setIsExpand(!isExpand);
  };

  return (
    <Styled isExpand={isExpand} onClick={onClickExpand}>
      <div className="container-expand">
        <div className="content-expand">
          <img className="left-icon" alt="img" src={icon} />
          <p className="title">{title}</p>
        </div>
        <img className="arrow" alt="arrow" src={ArrowDownSVG} />
      </div>
      {isExpand && child}
    </Styled>
  );
}
