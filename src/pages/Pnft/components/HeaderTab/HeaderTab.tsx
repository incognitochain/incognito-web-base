import { PnftCollectionsRoute } from 'pages/Pnft';
import { PnftProfileRoute } from 'pages/Pnft/features/Profile';
import { memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const StyledTitle = styled.p<{ isActive: boolean }>`
  font-weight: 700;
  font-size: 34px;
  line-height: 140%;
  cursor: pointer;
  margin-right: 40px;
  color: ${({ theme, isActive }) => (isActive ? theme.white : theme.bg4)};
`;

interface IProps {}

const HeaderTab = (props: IProps) => {
  const tabs = [
    { title: 'Collections', routePath: PnftCollectionsRoute.path },
    { title: 'Portfolio', routePath: PnftProfileRoute.path },
  ];

  const history = useHistory();
  const location = useLocation();

  const renderTab = (index: number, tab: any) => {
    const onClickTab = () => {
      history.push(tab.routePath);
    };
    return (
      <StyledTitle
        isActive={tab.routePath === location.pathname}
        key={index.toString()}
        className="tab-title"
        onClick={onClickTab}
      >
        {tab.title}
      </StyledTitle>
    );
  };
  return <Styled>{tabs.map((tab, index) => renderTab(index, tab))}</Styled>;
};

export default memo(HeaderTab);
