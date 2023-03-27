import { Container, Typography } from 'components/Core';
import styled from 'styled-components/macro';
import { ellipsisCenter } from 'utils';

const ContainerWrapper = styled.div`
  margin-top: 10px;
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
    limit: 15,
  });
  return (
    <ContainerWrapper>
      <Container onClick={() => onSelectedItem(address)}>
        <Typography.Text type="h7" fontWeight={600} textAlign="left">
          {name}
        </Typography.Text>
        <Typography.Text type="p2" fontWeight={500} color="gray_9C9C9C" textAlign="left">
          {addressEllipsis}
        </Typography.Text>
      </Container>
    </ContainerWrapper>
  );
};

export default AddressBookItem;

// export {};
