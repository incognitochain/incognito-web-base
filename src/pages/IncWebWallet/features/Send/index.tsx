// export { default as FormSend } from './FormSend';
// export { default as enhance } from './FormSend.enhance';
// export { default as reducer } from './FormSend.reducer';
import { Drawer } from 'antd';
import { useModal } from 'components/Modal';
import useFollowTokenSelected from 'pages/IncWebWallet/hooks/useFollowTokenSelected';
import { useState } from 'react';
import styled from 'styled-components/macro';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import AddressBook from '../AddressBook';
import FormSend from './FormSend/FormSend';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color_grey1};
  min-height: 670px;

  .drawer-style {
    display: flex;
    background-color: ${({ theme }) => theme.color_grey1};
  }
`;

interface Props {
  data?: any;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

const FormSendPage = (props: Props) => {
  const {} = props;
  const { closeModal } = useModal();
  const followTokenSelectedData = useFollowTokenSelected();
  const [open, setOpen] = useState(false);
  if (!followTokenSelectedData) return null;

  const showDrawer = (flag: boolean) => {
    setOpen(flag);
  };

  return (
    <Container>
      <NavigationHeader
        leftTitle={`Send ${followTokenSelectedData.symbol || ''}`}
        onBack={() => {
          // onCloseModal?.();
          closeModal();
        }}
      />
      <FormSend openAddressBook={() => showDrawer(true)} />
      <Drawer
        title="Address Book"
        placement="right"
        onClose={() => showDrawer(false)}
        open={open}
        contentWrapperStyle={{
          backgroundColor: '#303030',
        }}
        className="drawer-style"
      >
        <AddressBook />
      </Drawer>
    </Container>
  );
};

export default FormSendPage;
