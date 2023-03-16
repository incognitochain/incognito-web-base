import { Modal } from 'antd';
import styled from 'styled-components/macro';

interface ExportItemProps {
  label: string;
  data: any;
  onPress: () => void;
  onPressQRCode?: () => void;
  requiredPass?: boolean;
}

const ExportItemContainer = styled.div`
  padding: 16px;
`;

const ExportItemTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GroupButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonCopy = styled.div``;

const ButtonQrCode = styled.div``;

const ExportItem = (props: ExportItemProps) => {
  const { label, data, onPress, onPressQRCode } = props;
  return (
    <ExportItemContainer>
      <ExportItemTopContainer>
        <p>{label}</p>
        <GroupButton>
          <ButtonCopy />
          <ButtonQrCode />
        </GroupButton>
      </ExportItemTopContainer>
      <p>{data}</p>
    </ExportItemContainer>
  );
};

export const parseShard = (bytes: any) => {
  const arr = bytes.split(',');
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

interface AccountDetail {
  account?: any;
  token?: any;
  title?: any;
  isModalOpen?: boolean;
}

export const ModalAccountDetail = (props: AccountDetail) => {
  const { account, isModalOpen } = props;
  const renderItem = (label: any, value: any, requiredPass = false) =>
    value ? (
      <ExportItem
        label={label}
        data={value}
        requiredPass
        onPress={() => null}
        onPressQRCode={() => null}
        // onPressQRCode={() =>
        //   navigation.navigate(routeNames.ExportAccountModal, {
        //     params: {
        //       value,
        //       label,
        //     },
        //   })
        // }
        // onPress={() => {
        //   clipboard.set(value, { copiedMessage: `${label} was copied.` });
        // }}
      />
    ) : null;
  return (
    <Modal title="Basic Modal" open={isModalOpen}>
      {renderItem('Your incognito address', account?.PaymentAddress)}
    </Modal>
  );
};
