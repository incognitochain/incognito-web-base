import { Drawer } from 'antd';
import { useModal } from 'components/Modal';
import AddressBook from 'pages/IncWebWallet/features/AddressBook';
import { useState } from 'react';
import styled from 'styled-components/macro';

import FormSend from './FormSend/FormSend';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color_grey1};
  min-height: 470px;
`;

interface Props {
  data?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  inscriptionId: string;
  inscription: any;
}

const FormSendInscription = (props: Props) => {
  const { inscriptionId, inscription } = props;
  const { closeModal } = useModal();
  const [open, setOpen] = useState(false);

  const showDrawer = (flag: boolean) => {
    setOpen(flag);
  };

  return (
    <Container className="animation-opacity">
      <FormSend openAddressBook={() => showDrawer(true)} inscriptionId={inscriptionId} inscription={inscription} />
      <Drawer
        title="Address Book"
        placement="right"
        onClose={() => showDrawer(false)}
        open={open}
        headerStyle={{
          backgroundColor: '#303030',
        }}
        bodyStyle={{
          backgroundColor: '#303030',
        }}
      >
        <AddressBook showDrawer={showDrawer} isSendInscription={true} />
      </Drawer>
    </Container>
  );
};

export default FormSendInscription;
