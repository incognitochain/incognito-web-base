/* eslint-disable react-hooks/rules-of-hooks */
import { InscriptionLoader } from 'components/Core/InscriptionLoader';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Inscription } from 'state/inscriptions/inscriptions.types';
import { ellipsisCenter } from 'utils';

import { Container } from './MyInscriptionItem.styled';

type Props = {
  item?: Inscription;
  style?: any;
};

const InscriptionItem = (props: Props) => {
  const { item } = props;
  const history = useHistory();
  if (!item) return null;

  const { index, token_id } = item;
  const tokenIdShorten = ellipsisCenter({
    str: token_id,
    limit: 4,
  });

  const onClick = useCallback(() => {
    history.push(`inscription/${token_id}`);
  }, [token_id]);

  return (
    <Container key={token_id}>
      <InscriptionLoader inscription={item} onClick={onClick} disbledBlur={true} />
      <div className="card-info">
        <p className="title">{`Inscription #${index}`}</p>
        <p className="token-id">{tokenIdShorten}</p>
      </div>
    </Container>
  );
};

export default React.memo(InscriptionItem);
