/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { Container } from './InscriptionItem.styled';

type Props = {
  item?: any;
  style?: any;
};

const InscriptionItem = (props: Props) => {
  const { item } = props;
  if (!item) return null;
  return (
    <Container>
      <div className="card-image"></div>
      <div className="card-info"></div>
      {/* <CardImage />
      <CardInfo /> */}
    </Container>
  );
};

export default React.memo(InscriptionItem);
