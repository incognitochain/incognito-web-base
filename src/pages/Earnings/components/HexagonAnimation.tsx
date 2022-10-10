import animationData from 'assets/hexagon-animation.json';
import { memo } from 'react';
import Lottie from 'react-lottie';

const HexagonAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={defaultOptions} />;
};

export default memo(HexagonAnimation);
