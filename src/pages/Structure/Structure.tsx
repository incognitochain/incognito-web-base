import ExplorerIcon from 'components/icons/explorer.icon';
import OverviewIcon from 'components/icons/overview.icon';
import VNodeIcon from 'components/icons/vnode.icon';
import { structureTranslateSelector } from 'config/Configs.selector';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Section1 from './features/Structure.section1';
import Section3 from './features/Structure.section3';
import { Header, Icon, Styled } from './Structure.styled';

export const HeaderNode = () => {
  const history = useHistory();
  const Factory = [
    { icon: <OverviewIcon />, desc: 'Overview', path: '/mine', func: () => history.replace('/mine') },
    {
      icon: <VNodeIcon />,
      desc: 'Virtual Node',
      path: '/mine/validator',
      func: () => history.replace('/mine/validator'),
    },
    {
      icon: <ExplorerIcon />,
      desc: isMobile ? 'Explorer' : 'Network Explorer',
      func: () => window.open('https://explorer.incognito.org/', '_blank'),
    },
  ];
  return (
    <Header>
      {Factory.map((item) => {
        const isSelected = item.path && window.location.pathname === (item.path || '');
        return (
          <Icon isSelected={!!isSelected} className="wrap-item" key={item.desc} onClick={item.func}>
            {item.icon}
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
