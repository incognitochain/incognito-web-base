import { useParams } from 'react-router-dom';

import CollectionDetailListNFT from './CollectionDetail.listNFT';
import { Container } from './CollectionDetail.styled';

const CollectionDetail = () => {
  const { slug }: any = useParams();

  return (
    <Container className="default-max-width">
      <CollectionDetailListNFT slug={slug} />
    </Container>
  );
};

export default CollectionDetail;
