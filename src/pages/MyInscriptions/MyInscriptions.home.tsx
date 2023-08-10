import { Drawer } from 'antd';
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Book } from 'react-feather';

import DescriptionContent from './components/DescriptionContent';
import InscriptionList from './components/InscriptionList';
import MyInscriptionHistory from './components/MyInscriptionHistory';
import { TABS } from './MyInscriptions.constants';
import { Container, TabContainer } from './MyInscriptions.styles';

const InscriptionDetail = () => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState<string>(TABS.View);
  const showDrawer = (flag: boolean) => {
    setOpen(flag);
  };

  const renderTabItem = (text: string) => {
    return <p className="nav-title title">{text}</p>;
  };

  const renderOldContent = () => {
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

  return (
    <TabContainer>
      <Tabs
        id="uncontrolled-tab"
        mountOnEnter
        defaultActiveKey={key}
        activeKey={key}
        transition={false}
        onSelect={(k) => {
          setKey(k || TABS.View);
          if (k === TABS.History) {
            showDrawer(true);
          }
        }}
      >
        <Tab eventKey={TABS.View} title={renderTabItem(TABS.View)}>
          <InscriptionList></InscriptionList>
        </Tab>

        <Tab eventKey={TABS.History} title={renderTabItem(TABS.History)}>
          <Drawer
            title="History My Inscriptions"
            placement="right"
            onClose={() => {
              showDrawer(false);
              setKey(TABS.View);
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
        </Tab>
      </Tabs>
    </TabContainer>
  );
};

export default React.memo(InscriptionDetail);
