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
    grid-template-columns: auto auto;
  `}
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
  `}
`;

const Promote = () => {
  const Factory = [
    {
      icon: PaymentSVG,
      title: 'Privacy fuel',
      desc: 'PRV is used to pay transaction fees to participate in all Incognito’s privacy activities.',
    },
    {
      icon: StakeSVG,
      title: 'Staking',
      desc: 'Network validators stake PRV to secure the network and earn block rewards.',
    },
    {
      icon: GovernanceSVG,
      title: 'Governance',
      desc: 'PRV holders will shape the future of Incognito by signaling their support for upgrades and directing usage of a Community Treasury.',
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
