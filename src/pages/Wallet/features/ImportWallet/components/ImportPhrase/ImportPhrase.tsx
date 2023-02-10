import { ButtonPrimary } from 'components/Core/Button';
import React from 'react';

import { Container } from './ImportPhrase.styled';

interface ImportPhraseProps {}

const ImportPhrase = (props: ImportPhraseProps) => {
  return (
    <Container>
      <p className="title">Import wallet</p>
      <p className="desc">Recovery (seed) words 12-24 words</p>
      <div className="box">
        <p className="text-phrase"></p>
      </div>

      <ButtonPrimary className="btn" disabled>
        <p className="text-btn">Import</p>
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(ImportPhrase);
