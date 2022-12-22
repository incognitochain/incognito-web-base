import ExplorerIcon from 'components/icons/explorer.icon';
import OverviewIcon from 'components/icons/overview.icon';
// import PNodeIcon from 'components/icons/pnode.icon';
import VNodeIcon from 'components/icons/vnode.icon';
import { structureTranslateSelector } from 'config/Configs.selector';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { METRIC_TYPE, METRIC_UNIQ, updateMetric } from 'services/rpcMetric';

import Section1 from './features/Structure.section1';
import Section3 from './features/Structure.section3';
import { Header, Icon, Styled } from './Structure.styled';

export const HeaderNode = () => {
  const history = useHistory();
  const Factory = [
    {
      icon: OverviewIcon,
      desc: 'Overview',
      path: '/mine',
      func: () => {
        updateMetric({ metric: METRIC_TYPE.MINE_OVERVIEW, uniqMetric: METRIC_UNIQ.MINE_OVERVIEW_UNIQ });
        history.replace('/mine');
      },
    },
    // {
    //   icon: PNodeIcon,
    //   desc: 'PNode',
    //   func: () => {
    //     updateMetric({ metric: METRIC_TYPE.MINE_PNODE, uniqMetric: METRIC_UNIQ.MINE_PNODE_UNIQ });
    //     window.open('https://node1-staging.incognito.org/', '_blank');
    //   },
    // },
    {
      icon: VNodeIcon,
      desc: 'Virtual Node',
      path: '/mine/validator',
      func: () => {
        updateMetric({ metric: METRIC_TYPE.MINE_VNODE, uniqMetric: METRIC_UNIQ.MINE_VNODE_UNIQ });
        history.replace('/mine/validator');
      },
    },
    {
      icon: ExplorerIcon,
      desc: isMobile ? 'Explorer' : 'Network Explorer',
      func: () => {
        updateMetric({ metric: METRIC_TYPE.MINE_EXPLORER, uniqMetric: METRIC_UNIQ.MINE_EXPLORER_UNIQ });
        window.open('https://explorer.incognito.org/', '_blank');
      },
    },
  ];
  return (
    <Header>
      {Factory.map((item) => {
        const isSelected = item.path && window.location.pathname === (item.path || '');
        const VectorIcon = item.icon;
        return (
          <Icon isSelected={!!isSelected} className="wrap-item" key={item.desc} onClick={item.func}>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            {<VectorIcon color={isSelected ? 'white' : '#9C9C9C'} />}
            <p className="h8">{item.desc}</p>
          </Icon>
        );
      })}
    </Header>
  );
};

const Structure = () => {
  const structureTrs = useSelector(structureTranslateSelector);

  const Factory = React.useMemo(
    () => [
      {
        title: '54%',
        content: structureTrs.averageAnnualRoi,
        className: 'circle-margin-right',
      },
      {
        title: '2,000+',
        content: structureTrs.validatorsAcross,
        className: 'circle-margin-right',
      },
      {
        title: '1,750\nPRV',
        content: structureTrs.fairFixedStake,
      },
    ],
    [structureTrs]
  );
  return (
    <>
      <HeaderNode />
      <Styled>
        <Section1 />
        {/* <CircleList
        grid={{
          xs: 2,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        data={Factory}
      /> */}
        <Section3 />
      </Styled>
    </>
  );
};

export default React.memo(Structure);
