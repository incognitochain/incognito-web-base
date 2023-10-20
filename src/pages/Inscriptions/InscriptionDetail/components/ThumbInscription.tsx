/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { Inscription } from '../../../../state/inscriptions/inscriptions.types';
import { Container } from './ThumbInscription.styled';

type Props = {
  item?: Inscription;
  style?: any;
};

const ThumbInscription = (props: Props) => {
  const { item } = props;
  if (!item) return null;

  const { content_type, index, token_id } = item;
  return <Container></Container>;
};

export default React.memo(ThumbInscription);
