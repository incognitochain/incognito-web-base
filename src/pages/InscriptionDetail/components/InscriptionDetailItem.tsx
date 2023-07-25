import React from 'react';

import { Container } from './InscriptionDetailItem.styled';

type Props = {
  title: string;
  content: string;
  isLast?: boolean;
};

const InscriptionDetailItem = (props: Props) => {
  const { title, content, isLast = false } = props;
  return (
    <Container
      style={{
        borderBottom: isLast ? 'none' : '',
      }}
    >
      <p className="title">{title}</p>
      <p className="content">{content}</p>
    </Container>
  );
};

export default React.memo(InscriptionDetailItem);
