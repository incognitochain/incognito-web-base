import { Container } from './Collection.styled';
import Content from './Collections.content';
import BlurInfo from './Collections.info';

const Collections = () => {
  return (
    <Container className="default-max-width">
      <BlurInfo />
      <Content />
    </Container>
  );
};

export default Collections;
