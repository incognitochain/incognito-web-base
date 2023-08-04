import { Drawer } from 'antd';
import React, { useState } from 'react';
import { Book } from 'react-feather';

import DescriptionContent from './components/DescriptionContent';
import InscriptionList from './components/InscriptionList';
import MyInscriptionHistory from './components/MyInscriptionHistory';
import { Container } from './MyInscriptions.styles';

const InscriptionDetail = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = (flag: boolean) => {
    setOpen(flag);
  };

  return (
    <Container>
      <div className="book-container">
        <div className="wrapper-icon" onClick={() => showDrawer(true)}>
          <p className="text">History</p>
          <Book color="white" size={25} />
        </div>
      </div>

      <DescriptionContent />
      {/* <ToolBar /> */}
      <InscriptionList></InscriptionList>

      <Drawer
        title="History My Inscriptions"
        placement="right"
        onClose={() => showDrawer(false)}
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
