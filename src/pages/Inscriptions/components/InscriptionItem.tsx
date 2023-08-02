/* eslint-disable react-hooks/rules-of-hooks */
import { InscriptionLoader } from 'components/Core/InscriptionLoader';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Inscription } from 'state/inscriptions/inscriptions.types';
import { ellipsisCenter } from 'utils';

import { Container } from './InscriptionItem.styled';

type Props = {
  item?: Inscription;
  style?: any;
  onClickCallback?: any;
};

const InscriptionItem = (props: Props) => {
  const { item, onClickCallback } = props;
  const history = useHistory();
  if (!item) return null;

  const { index, token_id } = item;
  const tokenIdShorten = ellipsisCenter({
    str: token_id,
    limit: 4,
  });

  const onClick = useCallback(async () => {
    history.push(`inscription/${token_id}`);
    onClickCallback && onClickCallback();
  }, [token_id]);

  return (
    <Container>
      <InscriptionLoader inscription={item} onClick={onClick} />
      <div className="card-info">
        <p className="title">{`Inscription #${index}`}</p>
        <p className="token-id">{tokenIdShorten}</p>
      </div>
    </Container>
  );
};

export default React.memo(InscriptionItem);
