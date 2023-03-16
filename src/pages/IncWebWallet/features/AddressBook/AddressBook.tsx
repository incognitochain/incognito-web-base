import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { change } from 'redux-form';
import { useAppDispatch } from 'state/hooks';

import { FORM_CONFIGS } from '../Send/FormSend/FormSend.constant';
import AddressBookItem from './AddressBook.item';
import { getAccountListSelector } from './AddressBook.selector';
import { Container } from './AddressBook.styled';
import EmptyView from './EmptyView';

type Props = {
  showDrawer: (flag: boolean) => void;
};
const AddressBook = (props: Props) => {
  const { showDrawer = () => {} } = props;
  const dispatch = useAppDispatch();
  const factories = useSelector(getAccountListSelector) || [];
  const isEmpty = factories.length === 0;

  const onSelectedItem = useCallback((address: any) => {
    dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.toAddress, address));
    showDrawer(false);
  }, []);

  const renderItem = (account: any) => {
    return (
      <AddressBookItem
        address={account.paymentAddress || account.PaymentAddress}
        name={account.name}
        onSelectedItem={onSelectedItem}
        key={account.paymentAddress || account.PaymentAddress}
      />
    );
  };

  return (
    <Container>
      {factories.map((account: any) => renderItem(account))}
      {isEmpty && <EmptyView description="Empty address book" />}
    </Container>
  );
};

export default AddressBook;