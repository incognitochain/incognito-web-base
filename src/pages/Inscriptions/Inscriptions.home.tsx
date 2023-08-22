import { Drawer } from 'antd';
import MyInscriptionHistory from 'pages/Inscriptions/MyInscriptions/MyInscriptionHistory';
import MyInscriptionList from 'pages/Inscriptions/MyInscriptions/MyInscriptionList';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsMyInscriptionPage } from 'state/inscriptions';

import DescriptionContent from './components/DescriptionContent';
import FilterBox from './components/FilterBox';
import AllInscriptionList from './components/InscriptionList';
import ScrollToTop from './components/ScrollToTop';
import ToolBar from './components/ToolBar';
import { Container } from './Inscriptions.styles';

const InscriptionDetail = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = (flag: boolean) => {
    setOpen(flag);
  };

  const isMyInscriptionPage = useSelector(getIsMyInscriptionPage);

  const showHistoryOnClick = () => {
    showDrawer(true);
  };

  return (
    <Container className="default-max-width default-margin-bottom">
      <DescriptionContent />
      <FilterBox showHistory={showHistoryOnClick} />
      <ToolBar />
      {isMyInscriptionPage ? <MyInscriptionList /> : <AllInscriptionList />}
      <ScrollToTop />

      <Drawer
        title="History"
        placement="right"
        onClose={() => {
          showDrawer(false);
        }}
        open={open}
        headerStyle={{
          backgroundColor: '#303030',
        }}
        width={'30%'}
        bodyStyle={{
          backgroundColor: '#303030',
        }}
      >
        <MyInscriptionHistory showDrawer={showDrawer} />
      </Drawer>
    </Container>
  );
};

export default React.memo(InscriptionDetail);
