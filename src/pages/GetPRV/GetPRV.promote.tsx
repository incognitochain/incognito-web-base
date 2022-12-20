import React from 'react';
import styled from 'styled-components/macro';

import GovernanceSVG from './images/governance.svg';
import PaymentSVG from './images/payment.svg';
import StakeSVG from './images/stake.svg';

export const Styled = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 40px;
  margin-top: 50px;
  .wrap-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h6 {
    font-weight: 700;
    color: white;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .h8 {
    color: ${({ theme }) => theme.color_grey};
    max-width: 358px;
    text-align: center;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    gap: 30px;
    grid-template-columns: auto;
  `}
`;

const Promote = () => {
  const Factory = [
    {
      icon: StakeSVG,
      title: 'Staking',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      icon: PaymentSVG,
      title: 'Payment',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      icon: GovernanceSVG,
      title: 'Governance',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  const renderItem = (item: any) => {
    return (
      <div key={item.title} className="wrap-item">
        <img src={item.icon} />
        <h6>{item.title}</h6>
        <p className="h8">{item.desc}</p>
      </div>
    );
  };
  return <Styled className="default-max-width">{Factory.map(renderItem)}</Styled>;
};

export default React.memo(Promote);
