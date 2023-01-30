import useContentSize from 'hooks/useContentSize';
import { actionClearTokenState, tokenCollectionSelector } from 'pages/Pnft';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/hooks';

import SubRoute from '../../components/SubRoute';
import StickyFooter from './CollectionDetail.footer';
import Header from './CollectionDetail.header';
import CollectionDetailListNFT from './CollectionDetail.listNFT';
import { Container } from './CollectionDetail.styled';

const CollectionDetail = () => {
  const { slug }: any = useParams();
  const [size] = useContentSize();
  const dispatch = useAppDispatch();
  const collection = useAppSelector(tokenCollectionSelector);

  const clearData = () => {
    dispatch(actionClearTokenState());
  };

  useEffect(() => {
    return () => clearData();
  }, []);

  return (
    <div style={{ minHeight: size, width: '100%' }}>
      <Container className="default-max-width">
        <SubRoute collectionSlug={slug} collectionName={collection?.name || '...'} />
        <Header />
        <CollectionDetailListNFT slug={slug} />
      </Container>
      <StickyFooter />
    </div>
  );
};

export default CollectionDetail;
