import useContentSize from 'hooks/useContentSize';
import { useParams } from 'react-router-dom';

import StickyFooter from './CollectionDetail.footer';
import CollectionDetailListNFT from './CollectionDetail.listNFT';
import { Container } from './CollectionDetail.styled';

const CollectionDetail = () => {
  const { slug }: any = useParams();
  const [size] = useContentSize();

  return (
    <div style={{ minHeight: size, width: '100%' }}>
      <Container className="default-max-width">
        <CollectionDetailListNFT slug={slug} />
      </Container>
      <StickyFooter />
    </div>
  );
};

export default CollectionDetail;
