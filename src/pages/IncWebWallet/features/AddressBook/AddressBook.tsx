// import WrapContent from '@components/Content/Content';
// import { Empty } from '@components/empty';
// import Header from '@components/Header';
// import { IAddressBookItem } from '@module/Account/features/AddressBook/AddressBook.interface';
// import AddressBookItem from '@module/Account/features/AddressBook/AddressBook.item';

import { Container } from './AddressBook.styled';
import EmptyView from './EmptyView';

const AddressBook = (props: any) => {
  const { addressBook, onSelectedItem } = props;
  const factories = (addressBook || []).map((item: { title: string; data: any[] }) => ({
    masterKeyName: item.title,
    listAccount: item.data,
  }));

  const isEmpty = !factories.some((master: any) => master.listAccount.length > 0);

  const renderKeyChain = (item: any) => {
    // <AddressBookItem address={item.address} name={item.name} onSelectedItem={onSelectedItem} key={item.address} />
    return <></>;
  };

  return (
    <Container>
      {factories.map((account: any) => (
        <div key={account.masterKeyName}>{account.listAccount.map(renderKeyChain)}</div>
      ))}
      {isEmpty && <EmptyView description="Empty address book" />}
    </Container>
  );
};

// export default withAddressBook(AddressBook);
export default AddressBook;
