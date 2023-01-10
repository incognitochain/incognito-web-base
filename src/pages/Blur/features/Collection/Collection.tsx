import Content from './Collection.content';
import BlurInfo from './Collection.info';
import { Container } from './Collection.styled';

const Collection = () => {
  return (
    <Container className="default-max-width">
      <BlurInfo />
      <Content />
    </Container>
  );
};

export default Collection;
