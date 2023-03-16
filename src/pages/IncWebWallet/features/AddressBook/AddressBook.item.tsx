import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
import { ellipsisCenter } from 'utils';

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg1};
  min-height: 60px;

  :hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

type Props = {
  name?: string;
  address?: string;
  onSelectedItem: (item: any) => void;
};

const AddressBookItem = (props: Props) => {
  const { name = '', address = '', onSelectedItem = () => {} } = props;
  const addressEllipsis = ellipsisCenter({
    str: address || '',
    limit: 18,
  });
  return (
    <Container className="" onClick={() => onSelectedItem(address)}>
      <ThemedText.MediumLabel fontWeight={600} color="primary5">
        {name}
      </ThemedText.MediumLabel>
      <ThemedText.Small fontWeight={500} color="primary9">
        {addressEllipsis}
      </ThemedText.Small>
    </Container>
  );
};

export default AddressBookItem;

// export {};
