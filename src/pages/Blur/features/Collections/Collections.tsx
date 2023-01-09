import { Container } from './Collection.styled';
import BlurInfo from './Collections.info';
import CollectionsList from './Collections.list';

const Collections = () => {
  return (
    <Container className="default-max-width">
      <BlurInfo />
      <CollectionsList />
    </Container>
  );
};

export default Collections;
