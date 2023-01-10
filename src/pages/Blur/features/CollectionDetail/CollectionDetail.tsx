import { useParams } from 'react-router-dom';

import CollectionDetailListNFT from './CollectionDetail.listNFT';
import { Container } from './CollectionDetail.styled';

const CollectionDetail = () => {
  const { contract }: any = useParams();

  return (
    <Container className="default-max-width">
      <CollectionDetailListNFT contract={contract} />
    </Container>
  );
};

export default CollectionDetail;
