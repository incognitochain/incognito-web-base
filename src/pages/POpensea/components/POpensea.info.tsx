import { memo } from 'react';
import styled from 'styled-components/macro';

const Styled = styled.div`
  margin-bottom: 24px;
  .titleView {
    display: flex;
    flex-direction: column;
    .title-container {
      .title-custom {
        text-align: center;
        font-weight: 700;
      }
      .description-custom {
        width: 100%;
        margin-top: 24px;
        text-align: center;
      }
    }
  }
`;

const POpenseaInfo = () => {
  return (
    <Styled>
      <div className="titleView">
        <div className="title-container">
          <h3 className="title-custom">What is pOpenSea?</h3>
        </div>
        <div className="title-container">
          <p className="h8 description-custom" style={{ color: '#9C9C9C' }}>
            pOpenSea is a DApp that allows you to purchase NFTs and crypto collectibles on the largest web3 marketplace
            - Opensea - with full privacy on Incognito.
          </p>
        </div>
      </div>
    </Styled>
  );
};

export default memo(POpenseaInfo);
