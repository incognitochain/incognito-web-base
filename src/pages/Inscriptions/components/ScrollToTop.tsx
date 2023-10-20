import { useEffect, useState } from 'react';
import { ArrowUp } from 'react-feather';
import styled from 'styled-components/macro';

const Container = styled.div`
  .top-to-btm {
    position: relative;
  }
  .icon-position {
    position: fixed;
    bottom: 40px;
    right: 25px;
    z-index: 999999;
  }
  .icon-style {
    background-color: black;
    border: 2px solid #fff;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    color: #fff;
    cursor: pointer;
    animation: movebtn 3s ease-in-out infinite;
    transition: all 0.5s ease-in-out;
  }

  .icon-style:hover {
    animation: none;
    background: #fff;
    color: black;
    border: 2px solid black;
  }

  @keyframes movebtn {
    0% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(20px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Container>
      <div className="top-to-btm">
        {' '}
        {showTopBtn && <ArrowUp className="icon-position icon-style" onClick={goToTop} />}{' '}
      </div>
    </Container>
  );
};
export default ScrollToTop;
