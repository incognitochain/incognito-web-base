import HeaderTab from 'pages/Pnft/components/HeaderTab';

import Content from './Collections.content';
import PnftInfo from './Collections.info';
import { Container } from './Collections.styled';

// Collections
const Collections = () => {
  return (
    <Container>
      <HeaderTab />
      <PnftInfo />
      <Content />
    </Container>
  );
};

export default Collections;
