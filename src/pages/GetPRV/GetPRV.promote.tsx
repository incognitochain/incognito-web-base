import React from 'react';
import styled from 'styled-components/macro';

import GovernanceSVG from './images/governance.svg';
import PaymentSVG from './images/payment.svg';
import StakeSVG from './images/stake.svg';

export const Styled = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 40px;
  margin-top: 60px;
  .wrap-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h6 {
    font-weight: 700;
    color: ${({ theme }) => theme.text1};
    margin-top: 16px;
  }
  .h8 {
    color: ${({ theme }) => theme.color_grey};
    max-width: 358px;
    text-align: center;
    margin-top: 8px;
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
      desc: 'Users will be able to stake their tokens to become Incognito network validators to perform consensus work and earn block rewards.',
    },
    {
      icon: PaymentSVG,
      title: 'Utility',
      desc: "PRV is Incognito's utility token for paying the network fee to participate in privacy markets and use your favorite apps privately.",
    },
    {
      icon: GovernanceSVG,
      title: 'Governance',
      desc: 'PRV holders will shape the future of Incognito by signaling their support for upgrades to the ecosystem and directing usage of a Community Treasury.',
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
