import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

const Styled = styled.div`
  margin-top: 100px;
  height: 250px;
  max-height: 250px;
  display: flex;
  .wrapper {
    margin: 0px -200px;
    overflow: hidden;
  }

  .marquee {
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    animation: marquee 30s linear infinite;
  }

  .marquee p {
    display: inline-block;
    color: #303030;
    font-weight: 700;
    font-size: 200px;
  }

  @keyframes marquee {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    .marquee p {
      font-weight: 600;
      font-size: 100px;
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    .marquee p {
      font-weight: 500;
      font-size: 60px;
    }
  `}
`;

const ValidatorTextSlide = () => {
  const history = useHistory();
  return (
    <Styled>
      <div className="wrapper">
        <div className="marquee">
          <p>Validator-Rewards-PoS-PRV-vNode-pNode &nbsp;</p>
          <p>Validator-Rewards-PoS-PRV-vNode-pNode &nbsp;</p>
        </div>
      </div>
    </Styled>
  );
};

export default memo(ValidatorTextSlide);
