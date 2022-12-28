import React from 'react';

import { FormDeposit } from '../FormDeposit';
import { Container, Content } from './DepositPage.styled';

const DepositPage = React.memo(() => {
  return (
    <Container>
      <Content>
        <FormDeposit />
      </Content>
    </Container>
  );
});

export default DepositPage;
