import CopyIcon from 'components/Copy';
import { isEmpty } from 'lodash';
import React from 'react';

import { Container } from './InscriptionDetailItem.styled';

type Props = {
  title: string;
  content: string;
  isLast?: boolean;
  copiable?: boolean;
};

const InscriptionDetailItem = (props: Props) => {
  const { title, content, isLast = false, copiable = false } = props;
  return (
    <Container
      style={{
        borderBottom: isLast ? 'none' : '',
      }}
    >
      <p className="title">{title}</p>
      <div className="row">
        <p className="content">{content}</p>
        {copiable && <CopyIcon text={!isEmpty(content) ? content : ''} size={20} />}
      </div>
    </Container>
  );
};

export default React.memo(InscriptionDetailItem);
