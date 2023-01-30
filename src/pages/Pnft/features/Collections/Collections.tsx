import Content from './Collections.content';
import PnftInfo from './Collections.info';
import { Container } from './Collections.styled';

const Collections = () => {
  return (
    <Container>
      <PnftInfo />
      <Content />
    </Container>
  );
};

export default Collections;
