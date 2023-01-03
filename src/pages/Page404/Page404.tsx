import styled from 'styled-components/macro';

import Img404 from './images/404.png';
const Container = styled.div`
  min-height: 95vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  .image {
    width: 50%;
    height: fit-content;
  }
  h4 {
    margin-top: 40px;
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
  }
  .home-page {
    color: ${({ theme }) => theme.btn1};
    margin-top: 40px;
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`;

const Page404 = () => {
  return (
    <Container className="default-max-width">
      <img src={Img404} className="image" />
      <h4>Sorry! The page you’re looking for cannot be found</h4>
      <a href="/" className="home-page">
        Go to Homepage
      </a>
    </Container>
  );
};

export default Page404;
